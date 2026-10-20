import { DOWNLOAD_TTL_SECONDS } from "./orders.js";

export const FREE_DOWNLOAD_COOKIE_PREFIX = "afordz_free_download_";

export function freeDownloadCookieName(productId) {
  if (typeof productId !== "string" || !productId.trim()) {
    return null;
  }
  const safe = productId.trim().replace(/[^a-zA-Z0-9_-]/g, "_");
  return `${FREE_DOWNLOAD_COOKIE_PREFIX}${safe}`;
}

export function applyFreeDownloadCookie(response, token, productId, request) {
  const name = freeDownloadCookieName(productId);
  if (!name) {
    return response;
  }
  response.cookies.set(name, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl?.protocol === "https:",
    path: "/",
    maxAge: DOWNLOAD_TTL_SECONDS,
  });
  return response;
}
