import { NextResponse } from "next/server";
import { ensureOrderDatabase } from "@/lib/db";
import { logOrderStoreError } from "@/lib/order-db-log";
import { upsertNewsletterSubscriber } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await ensureOrderDatabase();
  } catch (error) {
    logOrderStoreError("newsletter_ensure", error);
    if (error?.code === "ORDER_DB_UNCONFIGURED" || error?.code === "ORDER_DB_TOKEN_MISSING") {
      return NextResponse.json(
        {
          error: "Newsletter signup is temporarily unavailable.",
          hint: "Configure the same order database used for checkout.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Newsletter signup could not be saved. Try again later." },
      { status: 500 },
    );
  }

  try {
    const result = await upsertNewsletterSubscriber({
      email: body?.email,
      source: body?.source,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      created: result.created,
      message: result.created
        ? "You are on the Afordz list. Unsubscribe anytime from future emails."
        : "You are already on the Afordz list.",
    });
  } catch (error) {
    logOrderStoreError("newsletter_upsert", error);
    return NextResponse.json(
      { error: "Newsletter signup could not be saved. Try again later." },
      { status: 500 },
    );
  }
}
