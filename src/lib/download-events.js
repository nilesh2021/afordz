import { randomUUID } from "node:crypto";
import { dbRun } from "./db.js";
import { logOrderStoreError } from "./order-db-log.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** Validates input for download event logging (does not throw). */
export function validateDownloadEventInput({ productId, email, channel, orderId }) {
  if (typeof productId !== "string" || !productId.trim()) {
    return { ok: false, error: "productId required" };
  }
  const normalizedEmail = normalizeEmail(email);
  if (!EMAIL_RE.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { ok: false, error: "email required" };
  }
  if (channel !== "free" && channel !== "paid") {
    return { ok: false, error: "channel invalid" };
  }
  if (channel === "paid" && (typeof orderId !== "string" || !orderId.trim())) {
    return { ok: false, error: "orderId required for paid" };
  }
  return {
    ok: true,
    productId: productId.trim(),
    email: normalizedEmail,
    channel,
    orderId: channel === "paid" ? orderId.trim() : null,
  };
}

/** Append a row when a product file is successfully served. Failures are logged, not thrown. */
export async function recordProductDownload(input) {
  const validated = validateDownloadEventInput(input);
  if (!validated.ok) {
    return validated;
  }

  const downloadedAt = new Date().toISOString();
  try {
    await dbRun(
      `INSERT INTO product_download_events (id, product_id, email, channel, order_id, downloaded_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        validated.productId,
        validated.email,
        validated.channel,
        validated.orderId,
        downloadedAt,
      ],
    );
    return { ok: true, downloadedAt };
  } catch (error) {
    logOrderStoreError("product_download_event", error);
    return { ok: false, error: "Could not record download event." };
  }
}
