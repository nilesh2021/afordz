import { cookies } from "next/headers";
import { freeCourseCookieName } from "./free-course-cookie.js";
import { getFreeCourseGrant, isEmailGatedCourseSlug } from "./free-course-access.js";

export async function hasFreeCourseAccess(courseSlug) {
  if (!isEmailGatedCourseSlug(courseSlug)) {
    return true;
  }
  const cookieStore = await cookies();
  const cookieName = freeCourseCookieName(courseSlug);
  const token = cookieName ? cookieStore.get(cookieName)?.value : undefined;
  const grant = await getFreeCourseGrant(token, courseSlug);
  return Boolean(grant);
}
