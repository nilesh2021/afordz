import { DOWNLOAD_TTL_SECONDS } from "./orders.js";

export const DOWNLOAD_COOKIE = "afordz_download";

export function applyDownloadCookie(response, token, request) {
  response.cookies.set(DOWNLOAD_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl?.protocol === "https:",
    path: "/",
    maxAge: DOWNLOAD_TTL_SECONDS,
  });
  return response;
}
