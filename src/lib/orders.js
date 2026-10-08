import { createHash, randomBytes } from "node:crypto";
import { getDb, withImmediateTransaction } from "./db.js";

export const DOWNLOAD_TTL_SECONDS = 48 * 60 * 60;

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function mapOrder(row) {
  if (!row) {
    return null;
  }
  let items = [];
  try {
    const parsed = JSON.parse(row.items_json);
    if (Array.isArray(parsed)) {
      items = parsed;
    }
  } catch {
    items = [];
  }
  return {
    id: row.id,
    razorpayOrderId: row.razorpay_order_id,
    status: row.status,
    amountPaise: row.amount_paise,
    currency: row.currency,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    items,
    paymentId: row.payment_id,
    downloadExpiresAt: row.download_expires_at,
    createdAt: row.created_at,
    paidAt: row.paid_at,
  };
}

export function insertPendingOrder(order) {
  getDb()
    .prepare(
      `INSERT INTO orders (
        id, razorpay_order_id, status, amount_paise, currency,
        customer_name, customer_email, items_json, created_at
      ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      order.id,
      order.razorpayOrderId,
      order.amountPaise,
      order.currency,
      order.customerName,
      order.customerEmail,
      JSON.stringify(order.items),
      order.createdAt,
    );
}

export function getOrderByRazorpayOrderId(razorpayOrderId) {
  const row = getDb()
    .prepare("SELECT * FROM orders WHERE razorpay_order_id = ?")
    .get(razorpayOrderId);
  return mapOrder(row);
}

export function getOrderByPaymentId(paymentId) {
  const row = getDb().prepare("SELECT * FROM orders WHERE payment_id = ?").get(paymentId);
  return mapOrder(row);
}

export function getPaidOrderByToken(token) {
  if (typeof token !== "string" || token.length < 32) {
    return null;
  }
  const row = getDb()
    .prepare(
      `SELECT * FROM orders
       WHERE download_token_hash = ?
         AND status = 'paid'
         AND download_expires_at > ?`,
    )
    .get(hashToken(token), new Date().toISOString());
  return mapOrder(row);
}

function isUniqueConstraint(error) {
  return typeof error?.message === "string" && /UNIQUE/i.test(error.message);
}

export function markOrderPaid({ razorpayOrderId, paymentId, paidAt }) {
  try {
    return withImmediateTransaction((db) => {
      const current = db
        .prepare("SELECT status, payment_id FROM orders WHERE razorpay_order_id = ?")
        .get(razorpayOrderId);

      if (!current) {
        return "missing";
      }

      if (current.status === "paid" && current.payment_id === paymentId) {
        return "already_paid";
      }

      if (current.payment_id && current.payment_id !== paymentId) {
        return "conflict";
      }

      const result = db
        .prepare(
          `UPDATE orders
           SET status = 'paid', payment_id = ?, paid_at = COALESCE(paid_at, ?)
           WHERE razorpay_order_id = ?
             AND (payment_id IS NULL OR payment_id = ?)`,
        )
        .run(paymentId, paidAt, razorpayOrderId, paymentId);

      return result.changes === 1 ? "paid" : "conflict";
    });
  } catch (error) {
    if (isUniqueConstraint(error)) {
      return "conflict";
    }
    throw error;
  }
}

export function issueDownloadToken(orderId) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + DOWNLOAD_TTL_SECONDS * 1000).toISOString();
  const result = getDb()
    .prepare(
      `UPDATE orders
       SET download_token_hash = ?, download_expires_at = ?
       WHERE id = ? AND status = 'paid'`,
    )
    .run(hashToken(token), expiresAt, orderId);

  if (result.changes !== 1) {
    return null;
  }

  return { token, expiresAt };
}

export function hasWebhookEvent(eventId) {
  const row = getDb().prepare("SELECT event_id FROM webhook_events WHERE event_id = ?").get(eventId);
  return Boolean(row);
}

export function recordWebhookEvent(eventId) {
  try {
    return withImmediateTransaction((db) => {
      const existing = db.prepare("SELECT event_id FROM webhook_events WHERE event_id = ?").get(eventId);
      if (existing) {
        return false;
      }
      db.prepare("INSERT INTO webhook_events (event_id, processed_at) VALUES (?, ?)").run(
        eventId,
        new Date().toISOString(),
      );
      return true;
    });
  } catch (error) {
    if (isUniqueConstraint(error)) {
      return false;
    }
    throw error;
  }
}
