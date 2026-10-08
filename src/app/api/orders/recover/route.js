import { NextResponse } from "next/server";
import { applyDownloadCookie } from "@/lib/download-cookie";
import {
  getOrderByPaymentId,
  getOrderByRazorpayOrderId,
  issueDownloadToken,
  markOrderPaid,
} from "@/lib/orders";
import { confirmCapturedPayment, fetchPayment, getRazorpayCredentials } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function redirectTo(request, query) {
  const target = new URL("/checkout/success", request.url);
  if (query) {
    target.searchParams.set("error", query);
  }
  return NextResponse.redirect(target, 303);
}

export async function POST(request) {
  const creds = getRazorpayCredentials();
  if (!creds.ok) {
    return redirectTo(request, "unavailable");
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return redirectTo(request, "unmatched");
  }

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const paymentId = String(form.get("paymentId") ?? "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^pay_[A-Za-z0-9]+$/.test(paymentId)) {
    return redirectTo(request, "unmatched");
  }

  let order = await getOrderByPaymentId(paymentId);
  if (!order) {
    const lookedUp = await fetchPayment(paymentId);
    const razorpayOrderId = lookedUp.ok ? lookedUp.payment?.order_id : "";
    if (typeof razorpayOrderId === "string" && razorpayOrderId.startsWith("order_")) {
      order = await getOrderByRazorpayOrderId(razorpayOrderId);
    }
  }

  if (!order || order.customerEmail !== email) {
    return redirectTo(request, "unmatched");
  }

  const confirmed = await confirmCapturedPayment({
    paymentId,
    razorpayOrderId: order.razorpayOrderId,
    amountPaise: order.amountPaise,
    currency: order.currency,
    localOrderId: order.id,
  });

  if (!confirmed.ok) {
    return redirectTo(
      request,
      confirmed.code === "unavailable" || confirmed.code === "auth_failed" ? "unavailable" : "unmatched",
    );
  }

  const paid = await markOrderPaid({
    razorpayOrderId: order.razorpayOrderId,
    paymentId,
    paidAt: new Date().toISOString(),
  });

  if (paid === "missing" || paid === "conflict") {
    return redirectTo(request, "unmatched");
  }

  const issued = await issueDownloadToken(order.id);
  if (!issued) {
    return redirectTo(request, "unavailable");
  }

  const response = redirectTo(request);
  return applyDownloadCookie(response, issued.token, request);
}
