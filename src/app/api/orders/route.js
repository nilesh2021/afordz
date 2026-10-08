import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildCheckoutOrder } from "@/lib/checkout-order";
import { ensureOrderDatabase } from "@/lib/db";
import { logOrderStoreError } from "@/lib/order-db-log";
import { insertPendingOrder } from "@/lib/orders";
import { createRazorpayOrder } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function paymentError(code) {
  if (code === "not_configured") {
    return NextResponse.json(
      { error: "Payments are not configured. Add Razorpay keys." },
      { status: 503 },
    );
  }
  if (code === "auth_failed") {
    return NextResponse.json(
      {
        error: "Razorpay keys were rejected. Check Key id and Key secret.",
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

  try {
    await ensureOrderDatabase();
  } catch (error) {
    logOrderStoreError("ensure", error);
    if (error?.code === "ORDER_DB_UNCONFIGURED" || error?.code === "ORDER_DB_TOKEN_MISSING") {
      return NextResponse.json(
        {
          error:
            "Checkout is temporarily unavailable. Configure persistent order storage for this deployment.",
          hint:
            "On Vercel, add TURSO_DATABASE_URL and a full-access TURSO_AUTH_TOKEN, redeploy, then open /api/orders/health.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        error: "The order could not be saved. Nothing was charged.",
        hint: error?.code === "BLOCKED" ? "Turso blocked schema setup. Check /api/orders/health." : undefined,
      },
      { status: 500 },
    );
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
    await insertPendingOrder({
      id: localOrderId,
      razorpayOrderId: created.razorpayOrderId,
      amountPaise: checkout.amountPaise,
      currency: "INR",
      customerName: checkout.name,
      customerEmail: checkout.email,
      items: checkout.items,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    logOrderStoreError("insert_pending", error);
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
