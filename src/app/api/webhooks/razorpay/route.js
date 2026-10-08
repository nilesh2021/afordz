import { NextResponse } from "next/server";
import {
  getOrderByRazorpayOrderId,
  hasWebhookEvent,
  markOrderPaid,
  recordWebhookEvent,
} from "@/lib/orders";
import { confirmCapturedPayment, verifyWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event?.event !== "payment.captured") {
    return NextResponse.json({ received: true });
  }

  const eventId = request.headers.get("x-razorpay-event-id")?.trim() ?? "";
  if (!eventId || eventId.length > 200) {
    return NextResponse.json({ error: "Missing event id." }, { status: 400 });
  }

  if (await hasWebhookEvent(eventId)) {
    return NextResponse.json({ received: true });
  }

  const payment = event?.payload?.payment?.entity;
  const paymentId = payment?.id;
  const razorpayOrderId = payment?.order_id;
  if (typeof paymentId !== "string" || typeof razorpayOrderId !== "string") {
    return NextResponse.json({ error: "Incomplete event." }, { status: 400 });
  }

  const order = await getOrderByRazorpayOrderId(razorpayOrderId);
  if (!order) {
    return NextResponse.json({ received: true });
  }

  const confirmed = await confirmCapturedPayment({
    paymentId,
    razorpayOrderId: order.razorpayOrderId,
    amountPaise: order.amountPaise,
    currency: order.currency,
    localOrderId: order.id,
  });

  if (!confirmed.ok && confirmed.code === "unavailable") {
    return NextResponse.json({ error: "Payment confirmation is unavailable." }, { status: 503 });
  }

  if (!confirmed.ok && confirmed.code === "pending") {
    return NextResponse.json({ error: "Payment is not captured." }, { status: 503 });
  }

  if (!confirmed.ok) {
    await recordWebhookEvent(eventId);
    return NextResponse.json({ received: true });
  }

  const paid = await markOrderPaid({
    razorpayOrderId: order.razorpayOrderId,
    paymentId,
    paidAt: new Date().toISOString(),
  });

  if (paid === "conflict") {
    await recordWebhookEvent(eventId);
    return NextResponse.json({ received: true });
  }

  await recordWebhookEvent(eventId);
  return NextResponse.json({ received: true });
}
