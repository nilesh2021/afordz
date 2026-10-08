import { createHmac, timingSafeEqual } from "node:crypto";
import { assessCapturedPayment } from "./payment-check.js";

const KEY_ID_PATTERN = /^rzp_(test|live)_[A-Za-z0-9]{8,}$/;
const KEY_ID_IN_SECRET_PATTERN = /^rzp_(test|live)_/;

export function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() ?? "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";

  if (!keyId || !keySecret) {
    return { ok: false, code: "not_configured" };
  }

  if (
    !KEY_ID_PATTERN.test(keyId) ||
    KEY_ID_IN_SECRET_PATTERN.test(keySecret) ||
    keySecret.length < 8
  ) {
    return { ok: false, code: "not_configured" };
  }

  return { ok: true, keyId, keySecret, live: keyId.startsWith("rzp_live_") };
}

export function getTestCredentials() {
  return getRazorpayCredentials();
}

function authHeader(keyId, keySecret) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

function safeEqualHex(expected, actual) {
  if (typeof actual !== "string" || !/^[0-9a-f]+$/i.test(actual) || expected.length !== actual.length) {
    return false;
  }
  const left = Buffer.from(expected, "hex");
  const right = Buffer.from(actual, "hex");
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const creds = getRazorpayCredentials();
  if (!creds.ok) {
    return false;
  }
  const expected = createHmac("sha256", creds.keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

export function verifyWebhookSignature(rawBody, signatureHeader) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim() ?? "";
  const creds = getRazorpayCredentials();
  if (!secret || !creds.ok || typeof rawBody !== "string" || !signatureHeader) {
    return false;
  }
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signatureHeader);
}

async function razorpayRequest(path, { method = "GET", body } = {}) {
  const creds = getRazorpayCredentials();
  if (!creds.ok) {
    return { ok: false, code: creds.code };
  }

  let response;
  try {
    response = await fetch(`https://api.razorpay.com${path}`, {
      method,
      headers: {
        Authorization: authHeader(creds.keyId, creds.keySecret),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    return { ok: false, code: "unavailable" };
  }

  if (response.status >= 500 || response.status === 429) {
    return { ok: false, code: "unavailable" };
  }

  if (!response.ok) {
    if (response.status === 401) {
      return { ok: false, code: "auth_failed" };
    }
    return { ok: false, code: "rejected" };
  }

  try {
    return { ok: true, data: await response.json(), keyId: creds.keyId };
  } catch {
    return { ok: false, code: "unavailable" };
  }
}

export async function createRazorpayOrder({ amountPaise, receipt, localOrderId }) {
  const created = await razorpayRequest("/v1/orders", {
    method: "POST",
    body: {
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes: { local_order_id: localOrderId },
    },
  });

  if (!created.ok) {
    return created;
  }

  const order = created.data;
  if (
    order?.currency !== "INR" ||
    order?.amount !== amountPaise ||
    typeof order?.id !== "string" ||
    !order.id.startsWith("order_")
  ) {
    return { ok: false, code: "rejected" };
  }

  return {
    ok: true,
    keyId: created.keyId,
    razorpayOrderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
}

export async function fetchPayment(paymentId) {
  if (typeof paymentId !== "string" || !/^pay_[A-Za-z0-9]+$/.test(paymentId)) {
    return { ok: false, code: "rejected" };
  }
  const result = await razorpayRequest(`/v1/payments/${encodeURIComponent(paymentId)}`);
  if (!result.ok) {
    return result;
  }
  return { ok: true, payment: result.data };
}

export async function confirmCapturedPayment(expected) {
  const paymentResult = await razorpayRequest(`/v1/payments/${encodeURIComponent(expected.paymentId)}`);
  if (!paymentResult.ok) {
    return { ok: false, code: paymentResult.code === "rejected" ? "pending" : paymentResult.code };
  }

  const orderResult = await razorpayRequest(
    `/v1/orders/${encodeURIComponent(expected.razorpayOrderId)}`,
  );
  if (!orderResult.ok) {
    return { ok: false, code: orderResult.code === "rejected" ? "pending" : orderResult.code };
  }

  const verdict = assessCapturedPayment({
    payment: paymentResult.data,
    remoteOrder: orderResult.data,
    expected,
  });

  if (verdict !== "captured") {
    return { ok: false, code: verdict };
  }

  return { ok: true };
}
