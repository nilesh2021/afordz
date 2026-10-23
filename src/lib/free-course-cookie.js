/** One year — course access, not a short-lived download link. */
export const FREE_COURSE_COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export const FREE_COURSE_COOKIE_PREFIX = "afordz_free_course_";

export function freeCourseCookieName(courseSlug) {
  if (typeof courseSlug !== "string" || !courseSlug.trim()) {
    return null;
  }
  const safe = courseSlug.trim().replace(/[^a-zA-Z0-9_-]/g, "_");
  return `${FREE_COURSE_COOKIE_PREFIX}${safe}`;
}

export function applyFreeCourseCookie(response, token, courseSlug, request) {
  const name = freeCourseCookieName(courseSlug);
  if (!name) {
    return response;
  }
  response.cookies.set(name, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl?.protocol === "https:",
    path: "/",
    maxAge: FREE_COURSE_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}
