import { NextResponse } from "next/server";
import { applyDownloadCookie } from "@/lib/download-cookie";
import { getOrderByRazorpayOrderId, issueDownloadToken, markOrderPaid } from "@/lib/orders";
import { confirmCapturedPayment, verifyPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payment details were missing." }, { status: 400 });
  }

  const orderId = typeof body?.razorpay_order_id === "string" ? body.razorpay_order_id : "";
  const paymentId = typeof body?.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
  const signature = typeof body?.razorpay_signature === "string" ? body.razorpay_signature : "";

  if (!orderId || !paymentId || !signature || !verifyPaymentSignature({ orderId, paymentId, signature })) {
    return NextResponse.json({ error: "The payment could not be verified." }, { status: 400 });
  }

  const order = getOrderByRazorpayOrderId(orderId);
  if (!order) {
    return NextResponse.json({ error: "The payment could not be verified." }, { status: 400 });
  }

  const confirmed = await confirmCapturedPayment({
    paymentId,
    razorpayOrderId: order.razorpayOrderId,
    amountPaise: order.amountPaise,
    currency: order.currency,
    localOrderId: order.id,
  });

  if (!confirmed.ok) {
    const status = confirmed.code === "unavailable" ? 503 : 402;
    return NextResponse.json(
      { error: "The payment is not confirmed yet. No download was created." },
      { status },
    );
  }

  const paid = markOrderPaid({
    razorpayOrderId: order.razorpayOrderId,
    paymentId,
    paidAt: new Date().toISOString(),
  });

  if (paid === "missing" || paid === "conflict") {
    return NextResponse.json({ error: "The payment could not be recorded." }, { status: 409 });
  }

  const issued = issueDownloadToken(order.id);
  if (!issued) {
    return NextResponse.json({ error: "The download could not be prepared." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  return applyDownloadCookie(response, issued.token, request);
}
