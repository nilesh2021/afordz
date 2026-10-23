import { createHash, randomBytes } from "node:crypto";
import { dbGet, dbRun } from "./db.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FREE_EMAIL_GATED_COURSE_SLUG = "ui-ux";

const GATED_COURSE_SLUGS = new Set([FREE_EMAIL_GATED_COURSE_SLUG]);

/** Access grant lifetime — matches cookie max-age (~1 year). */
export const FREE_COURSE_GRANT_TTL_SECONDS = 365 * 24 * 60 * 60;

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function requiresFreeCourseEmailGate(track) {
  return typeof track?.slug === "string" && GATED_COURSE_SLUGS.has(track.slug);
}

export function isEmailGatedCourseSlug(courseSlug) {
  return typeof courseSlug === "string" && GATED_COURSE_SLUGS.has(courseSlug.trim());
}

export function freeCourseNewsletterSource(courseSlug) {
  return `free-course:${courseSlug}`;
}

export function normalizeUnlockEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validateFreeCourseUnlockInput({ email, courseSlug }) {
  const normalizedEmail = normalizeUnlockEmail(email);
  const slug = typeof courseSlug === "string" ? courseSlug.trim() : "";

  if (!EMAIL_RE.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (!isEmailGatedCourseSlug(slug)) {
    return { ok: false, error: "This course is not available." };
  }
  return { ok: true, email: normalizedEmail, courseSlug: slug };
}

export async function createFreeCourseGrant({ courseSlug, email }) {
  const validated = validateFreeCourseUnlockInput({ email, courseSlug });
  if (!validated.ok) {
    return validated;
  }

  const token = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + FREE_COURSE_GRANT_TTL_SECONDS * 1000).toISOString();

  await dbRun(
    `INSERT INTO free_course_grants (token_hash, course_slug, email, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [hashToken(token), validated.courseSlug, validated.email, expiresAt, now.toISOString()],
  );

  return {
    ok: true,
    token,
    expiresAt,
    courseSlug: validated.courseSlug,
    email: validated.email,
  };
}

export async function getFreeCourseGrant(token, courseSlug) {
  if (typeof token !== "string" || token.length < 32 || !isEmailGatedCourseSlug(courseSlug)) {
    return null;
  }
  const row = await dbGet(
    `SELECT course_slug, email, expires_at FROM free_course_grants
     WHERE token_hash = ?
       AND course_slug = ?
       AND expires_at > ?`,
    [hashToken(token), courseSlug.trim(), new Date().toISOString()],
  );
  if (!row) {
    return null;
  }
  return {
    courseSlug: row.course_slug,
    email: row.email,
    expiresAt: row.expires_at,
  };
}
