import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildCheckoutOrder } from "@/lib/checkout-order";
import { insertPendingOrder } from "@/lib/orders";
import { createRazorpayOrder } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function paymentError(code) {
  if (code === "live_disabled") {
    return NextResponse.json(
      { error: "Live payments are disabled. Add a Razorpay test key." },
      { status: 403 },
    );
  }
  if (code === "not_configured") {
    return NextResponse.json(
      { error: "Payments are not configured. Add Razorpay test keys." },
      { status: 503 },
    );
  }
  if (code === "auth_failed") {
    return NextResponse.json(
      {
        error: "Razorpay test keys were rejected. Check Key id and Key secret in .env.local.",
      },
      { status: 503 },
    );
  }
  return NextResponse.json(
    { error: "The payment order could not be created. Nothing was charged." },
    { status: 502 },
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter your name and email." }, { status: 400 });
  }

  const checkout = buildCheckoutOrder(body);
  if (!checkout.ok) {
    return NextResponse.json({ error: checkout.error }, { status: 400 });
  }

  const localOrderId = randomUUID();
  const created = await createRazorpayOrder({
    amountPaise: checkout.amountPaise,
    receipt: localOrderId,
    localOrderId,
  });

  if (!created.ok) {
    return paymentError(created.code);
  }

  try {
    insertPendingOrder({
      id: localOrderId,
      razorpayOrderId: created.razorpayOrderId,
      amountPaise: checkout.amountPaise,
      currency: "INR",
      customerName: checkout.name,
      customerEmail: checkout.email,
      items: checkout.items,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "The order could not be saved. Nothing was charged." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    keyId: created.keyId,
    razorpayOrderId: created.razorpayOrderId,
    amount: created.amount,
    currency: created.currency,
  });
}
