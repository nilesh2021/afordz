/**
 * Pure checks for a Razorpay payment. Callers fetch the payment and the order
 * from Razorpay first. A download is allowed only when this returns "captured".
 */
export function assessCapturedPayment({ payment, remoteOrder, expected }) {
  if (!payment || !remoteOrder || !expected) {
    return "unavailable";
  }

  const sameOrder =
    payment.id === expected.paymentId &&
    payment.order_id === expected.razorpayOrderId &&
    remoteOrder.id === expected.razorpayOrderId;

  const sameMoney =
    payment.amount === expected.amountPaise &&
    remoteOrder.amount === expected.amountPaise &&
    payment.currency === "INR" &&
    remoteOrder.currency === "INR" &&
    expected.currency === "INR";

  const note = remoteOrder.notes?.local_order_id;
  const sameLocal = typeof note !== "string" || note === "" || note === expected.localOrderId;

  if (!sameOrder || !sameMoney || !sameLocal) {
    return "mismatch";
  }

  if (payment.status !== "captured" || remoteOrder.status !== "paid") {
    return "pending";
  }

  return "captured";
}
