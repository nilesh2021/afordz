import { getProductById, isComingSoon, isFreeProduct } from "../data/products.js";
import { dbGet, dbRun } from "./db.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["footer", "checkout"]);
const FREE_DOWNLOAD_PREFIX = "free-download:";
const WAITLIST_PREFIX = "waitlist:";
const FREE_COURSE_PREFIX = "free-course:";

const GATED_FREE_COURSE_SLUGS = new Set(["ui-ux"]);

function isAllowedFreeDownloadSource(source) {
  if (!source.startsWith(FREE_DOWNLOAD_PREFIX)) {
    return false;
  }
  const productId = source.slice(FREE_DOWNLOAD_PREFIX.length);
  return isFreeProduct(getProductById(productId));
}

function isAllowedWaitlistSource(source) {
  if (!source.startsWith(WAITLIST_PREFIX)) {
    return false;
  }
  const productId = source.slice(WAITLIST_PREFIX.length);
  if (!productId) {
    return false;
  }
  const product = getProductById(productId);
  return isComingSoon(product);
}

function isAllowedFreeCourseSource(source) {
  if (!source.startsWith(FREE_COURSE_PREFIX)) {
    return false;
  }
  const courseSlug = source.slice(FREE_COURSE_PREFIX.length);
  return GATED_FREE_COURSE_SLUGS.has(courseSlug);
}

export function normalizeNewsletterEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validateNewsletterInput({ email, source }) {
  const normalizedEmail = normalizeNewsletterEmail(email);
  const normalizedSource = typeof source === "string" ? source.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (
    !ALLOWED_SOURCES.has(normalizedSource) &&
    !isAllowedFreeDownloadSource(normalizedSource) &&
    !isAllowedWaitlistSource(normalizedSource) &&
    !isAllowedFreeCourseSource(normalizedSource)
  ) {
    return { ok: false, error: "Choose a valid signup source." };
  }

  return { ok: true, email: normalizedEmail, source: normalizedSource };
}

/** Upsert a marketing subscriber. Order emails are separate unless the shopper opts in. */
export async function upsertNewsletterSubscriber({ email, source }) {
  const validated = validateNewsletterInput({ email, source });
  if (!validated.ok) {
    return validated;
  }

  const now = new Date().toISOString();
  const existing = await dbGet(
    "SELECT email, created_at FROM newsletter_subscribers WHERE email = ?",
    [validated.email],
  );

  if (existing) {
    await dbRun(
      `UPDATE newsletter_subscribers
       SET source = ?, updated_at = ?
       WHERE email = ?`,
      [validated.source, now, validated.email],
    );
    return { ok: true, email: validated.email, created: false };
  }

  await dbRun(
    `INSERT INTO newsletter_subscribers (email, source, created_at, updated_at)
     VALUES (?, ?, ?, ?)`,
    [validated.email, validated.source, now, now],
  );

  return { ok: true, email: validated.email, created: true };
}
