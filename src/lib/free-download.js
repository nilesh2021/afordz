import { createHash, randomBytes } from "node:crypto";
import { getProductById, isFreeProduct } from "../data/products.js";
import { dbGet, dbRun } from "./db.js";
import { DOWNLOAD_TTL_SECONDS } from "./orders.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function freeDownloadNewsletterSource(productId) {
  return `free-download:${productId}`;
}

export function normalizeUnlockEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validateFreeUnlockInput({ email, productId }) {
  const normalizedEmail = normalizeUnlockEmail(email);
  if (!EMAIL_RE.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (typeof productId !== "string" || !productId.trim()) {
    return { ok: false, error: "This download is not available." };
  }
  const product = getProductById(productId.trim());
  if (!isFreeProduct(product)) {
    return { ok: false, error: "This download is not available." };
  }
  return { ok: true, email: normalizedEmail, productId: product.id };
}

export async function createFreeDownloadGrant({ productId, email }) {
  const validated = validateFreeUnlockInput({ email, productId });
  if (!validated.ok) {
    return validated;
  }

  const token = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + DOWNLOAD_TTL_SECONDS * 1000).toISOString();

  await dbRun(
    `INSERT INTO free_download_grants (token_hash, product_id, email, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [hashToken(token), validated.productId, validated.email, expiresAt, now.toISOString()],
  );

  return { ok: true, token, expiresAt, productId: validated.productId, email: validated.email };
}

export async function getFreeDownloadGrant(token, productId) {
  if (typeof token !== "string" || token.length < 32 || typeof productId !== "string") {
    return null;
  }
  const row = await dbGet(
    `SELECT product_id, email, expires_at FROM free_download_grants
     WHERE token_hash = ?
       AND product_id = ?
       AND expires_at > ?`,
    [hashToken(token), productId, new Date().toISOString()],
  );
  if (!row) {
    return null;
  }
  return {
    productId: row.product_id,
    email: row.email,
    expiresAt: row.expires_at,
  };
}
