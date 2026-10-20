import { NextResponse } from "next/server";
import { ensureOrderDatabase } from "@/lib/db";
import { applyFreeDownloadCookie } from "@/lib/free-download-cookie";
import {
  createFreeDownloadGrant,
  freeDownloadNewsletterSource,
  validateFreeUnlockInput,
} from "@/lib/free-download";
import { upsertNewsletterSubscriber } from "@/lib/newsletter";
import { logOrderStoreError } from "@/lib/order-db-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const unlockCheck = validateFreeUnlockInput({
    email: body?.email,
    productId: body?.productId,
  });
  if (!unlockCheck.ok) {
    return NextResponse.json({ error: unlockCheck.error }, { status: 400 });
  }

  try {
    await ensureOrderDatabase();
  } catch (error) {
    logOrderStoreError("free_download_ensure", error);
    if (error?.code === "ORDER_DB_UNCONFIGURED" || error?.code === "ORDER_DB_TOKEN_MISSING") {
      return NextResponse.json(
        {
          error: "Free download is temporarily unavailable.",
          hint: "Configure the same order database used for checkout.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Free download could not be unlocked. Try again later." },
      { status: 500 },
    );
  }

  try {
    const newsletter = await upsertNewsletterSubscriber({
      email: unlockCheck.email,
      source: freeDownloadNewsletterSource(unlockCheck.productId),
    });
    if (!newsletter.ok) {
      return NextResponse.json({ error: newsletter.error }, { status: 400 });
    }

    const grant = await createFreeDownloadGrant({
      productId: unlockCheck.productId,
      email: unlockCheck.email,
    });
    if (!grant.ok) {
      return NextResponse.json({ error: grant.error }, { status: 400 });
    }

    const response = NextResponse.json({
      ok: true,
      message: "Your download link is ready.",
      expiresAt: grant.expiresAt,
      productId: grant.productId,
    });
    return applyFreeDownloadCookie(response, grant.token, grant.productId, request);
  } catch (error) {
    logOrderStoreError("free_download_unlock", error);
    return NextResponse.json(
      { error: "Free download could not be unlocked. Try again later." },
      { status: 500 },
    );
  }
}
