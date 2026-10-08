import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { createHmac } from "node:crypto";

const directory = mkdtempSync(path.join(tmpdir(), "afordz-orders-"));
process.env.AFORDZ_DB_PATH = path.join(directory, "orders.sqlite");
process.env.RAZORPAY_KEY_ID = "rzp_test_example1234";
process.env.RAZORPAY_KEY_SECRET = "test_secret_value";
process.env.RAZORPAY_WEBHOOK_SECRET = "hook_secret";

const { assessCapturedPayment } = await import("../src/lib/payment-check.js");
const { getRazorpayCredentials, verifyPaymentSignature, verifyWebhookSignature } = await import(
  "../src/lib/razorpay.js"
);
const { buildCheckoutOrder } = await import("../src/lib/checkout-order.js");
const { closeDb } = await import("../src/lib/db.js");
const {
  getPaidOrderByToken,
  hasWebhookEvent,
  insertPendingOrder,
  issueDownloadToken,
  markOrderPaid,
  recordWebhookEvent,
} = await import("../src/lib/orders.js");

const expected = {
  paymentId: "pay_test123",
  razorpayOrderId: "order_test123",
  amountPaise: 14900,
  currency: "INR",
  localOrderId: "local-1",
};

function capturedPayment(overrides = {}) {
  return {
    id: expected.paymentId,
    order_id: expected.razorpayOrderId,
    amount: expected.amountPaise,
    currency: "INR",
    status: "captured",
    ...overrides,
  };
}

function paidOrder(overrides = {}) {
  return {
    id: expected.razorpayOrderId,
    amount: expected.amountPaise,
    currency: "INR",
    status: "paid",
    notes: { local_order_id: expected.localOrderId },
    ...overrides,
  };
}

test("captured payment must match order, amount, and INR", () => {
  assert.equal(
    assessCapturedPayment({
      payment: capturedPayment(),
      remoteOrder: paidOrder(),
      expected,
    }),
    "captured",
  );
  assert.equal(
    assessCapturedPayment({
      payment: capturedPayment({ amount: 100 }),
      remoteOrder: paidOrder(),
      expected,
    }),
    "mismatch",
  );
  assert.equal(
    assessCapturedPayment({
      payment: capturedPayment({ currency: "USD" }),
      remoteOrder: paidOrder(),
      expected,
    }),
    "mismatch",
  );
  assert.equal(
    assessCapturedPayment({
      payment: capturedPayment({ status: "authorized" }),
      remoteOrder: paidOrder({ status: "attempted" }),
      expected,
    }),
    "pending",
  );
  assert.equal(
    assessCapturedPayment({
      payment: capturedPayment(),
      remoteOrder: paidOrder({ notes: { local_order_id: "other" } }),
      expected,
    }),
    "mismatch",
  );
});

test("invalid or placeholder test credentials are rejected", () => {
  const savedId = process.env.RAZORPAY_KEY_ID;
  const savedSecret = process.env.RAZORPAY_KEY_SECRET;

  process.env.RAZORPAY_KEY_ID = "rzp_test_";
  process.env.RAZORPAY_KEY_SECRET = "validsecret1";
  assert.equal(getRazorpayCredentials().code, "not_configured");

  process.env.RAZORPAY_KEY_ID = "rzp_test_example1234";
  process.env.RAZORPAY_KEY_SECRET = "rzp_test_looksLikeKeyId";
  assert.equal(getRazorpayCredentials().code, "not_configured");

  process.env.RAZORPAY_KEY_ID = savedId;
  process.env.RAZORPAY_KEY_SECRET = savedSecret;
  assert.equal(getRazorpayCredentials().ok, true);
});

test("live keys are accepted and webhook signatures use the raw body", () => {
  assert.equal(getRazorpayCredentials().ok, true);
  assert.equal(getRazorpayCredentials().live, false);

  const previous = process.env.RAZORPAY_KEY_ID;
  process.env.RAZORPAY_KEY_ID = "rzp_live_example1234";
  assert.equal(getRazorpayCredentials().ok, true);
  assert.equal(getRazorpayCredentials().live, true);
  process.env.RAZORPAY_KEY_ID = "rzp_live_secret";
  assert.equal(getRazorpayCredentials().code, "not_configured");
  assert.equal(verifyWebhookSignature("{}", "abc"), false);
  process.env.RAZORPAY_KEY_ID = previous;

  const body = '{"event":"payment.captured"}';
  const signature = createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex");
  assert.equal(verifyWebhookSignature(body, signature), true);
  assert.equal(verifyWebhookSignature(`${body} `, signature), false);

  const paymentSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${expected.razorpayOrderId}|${expected.paymentId}`)
    .digest("hex");
  assert.equal(
    verifyPaymentSignature({
      orderId: expected.razorpayOrderId,
      paymentId: expected.paymentId,
      signature: paymentSignature,
    }),
    true,
  );
});

test("checkout price comes from the catalogue, not the request", () => {
  const priced = buildCheckoutOrder({
    name: "Test Buyer",
    email: "buyer@example.com",
    productIds: ["bootstrap-templates-bundle"],
    amount: 999999,
    priceInr: 999999,
  });
  assert.equal(priced.ok, true);
  assert.equal(priced.amountPaise, 100);
  assert.equal(
    buildCheckoutOrder({
      name: "Test Buyer",
      email: "buyer@example.com",
      productIds: ["marketing-contact-email-list"],
    }).ok,
    false,
  );
});

test("orders persist in sqlite and duplicate webhook events are ignored", async () => {
  await insertPendingOrder({
    id: expected.localOrderId,
    razorpayOrderId: expected.razorpayOrderId,
    amountPaise: expected.amountPaise,
    currency: "INR",
    customerName: "Test Buyer",
    customerEmail: "buyer@example.com",
    items: [{ id: "bootstrap-templates-bundle", name: "Bundle", priceInr: 149 }],
    createdAt: new Date().toISOString(),
  });

  assert.equal(
    await markOrderPaid({
      razorpayOrderId: expected.razorpayOrderId,
      paymentId: expected.paymentId,
      paidAt: new Date().toISOString(),
    }),
    "paid",
  );
  assert.equal(
    await markOrderPaid({
      razorpayOrderId: expected.razorpayOrderId,
      paymentId: expected.paymentId,
      paidAt: new Date().toISOString(),
    }),
    "already_paid",
  );
  assert.equal(
    await markOrderPaid({
      razorpayOrderId: expected.razorpayOrderId,
      paymentId: "pay_other",
      paidAt: new Date().toISOString(),
    }),
    "conflict",
  );

  const issued = await issueDownloadToken(expected.localOrderId);
  assert.equal(typeof issued.token, "string");
  assert.equal(issued.token.includes(" "), false);
  const paid = await getPaidOrderByToken(issued.token);
  assert.equal(paid.paymentId, expected.paymentId);
  assert.equal(Object.hasOwn(paid, "downloadToken"), false);
  assert.equal(await getPaidOrderByToken("not-a-real-token-value-with-enough-length"), null);

  assert.equal(await recordWebhookEvent("evt_1"), true);
  assert.equal(await recordWebhookEvent("evt_1"), false);
  assert.equal(await hasWebhookEvent("evt_1"), true);
});

test.after(() => {
  closeDb();
  rmSync(directory, { recursive: true, force: true });
});
