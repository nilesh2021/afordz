import { NextResponse } from "next/server";
import { ensureOrderDatabase } from "@/lib/db";
import { applyFreeCourseCookie } from "@/lib/free-course-cookie";
import {
  createFreeCourseGrant,
  freeCourseNewsletterSource,
  validateFreeCourseUnlockInput,
} from "@/lib/free-course-access";
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

  const unlockCheck = validateFreeCourseUnlockInput({
    email: body?.email,
    courseSlug: body?.courseSlug,
  });
  if (!unlockCheck.ok) {
    return NextResponse.json({ error: unlockCheck.error }, { status: 400 });
  }

  try {
    await ensureOrderDatabase();
  } catch (error) {
    logOrderStoreError("free_course_ensure", error);
    if (error?.code === "ORDER_DB_UNCONFIGURED" || error?.code === "ORDER_DB_TOKEN_MISSING") {
      return NextResponse.json(
        {
          error: "Course unlock is temporarily unavailable.",
          hint: "Configure the same order database used for checkout.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Course could not be unlocked. Try again later." },
      { status: 500 },
    );
  }

  try {
    const newsletter = await upsertNewsletterSubscriber({
      email: unlockCheck.email,
      source: freeCourseNewsletterSource(unlockCheck.courseSlug),
    });
    if (!newsletter.ok) {
      return NextResponse.json({ error: newsletter.error }, { status: 400 });
    }

    const grant = await createFreeCourseGrant({
      courseSlug: unlockCheck.courseSlug,
      email: unlockCheck.email,
    });
    if (!grant.ok) {
      return NextResponse.json({ error: grant.error }, { status: 400 });
    }

    const response = NextResponse.json({
      ok: true,
      message: "Course unlocked. Start the first lesson when you're ready.",
      expiresAt: grant.expiresAt,
      courseSlug: grant.courseSlug,
    });
    return applyFreeCourseCookie(response, grant.token, grant.courseSlug, request);
  } catch (error) {
    logOrderStoreError("free_course_unlock", error);
    return NextResponse.json(
      { error: "Course could not be unlocked. Try again later." },
      { status: 500 },
    );
  }
}
