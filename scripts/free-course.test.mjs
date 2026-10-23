import assert from "node:assert/strict";
import test from "node:test";
import {
  isEmailGatedCourseSlug,
  requiresFreeCourseEmailGate,
  validateFreeCourseUnlockInput,
} from "../src/lib/free-course-access.js";
import { validateNewsletterInput } from "../src/lib/newsletter.js";

test("validateFreeCourseUnlockInput accepts ui-ux email", () => {
  const result = validateFreeCourseUnlockInput({
    email: "reader@example.com",
    courseSlug: "ui-ux",
  });
  assert.equal(result.ok, true);
  assert.equal(result.courseSlug, "ui-ux");
});

test("validateFreeCourseUnlockInput rejects unknown course slug", () => {
  const result = validateFreeCourseUnlockInput({
    email: "reader@example.com",
    courseSlug: "genai",
  });
  assert.equal(result.ok, false);
});

test("validateFreeCourseUnlockInput rejects invalid email", () => {
  const result = validateFreeCourseUnlockInput({
    email: "not-an-email",
    courseSlug: "ui-ux",
  });
  assert.equal(result.ok, false);
});

test("newsletter allows free-course source for ui-ux", () => {
  const result = validateNewsletterInput({
    email: "reader@example.com",
    source: "free-course:ui-ux",
  });
  assert.equal(result.ok, true);
});

test("newsletter rejects free-course source for unknown slug", () => {
  const result = validateNewsletterInput({
    email: "reader@example.com",
    source: "free-course:genai",
  });
  assert.equal(result.ok, false);
});

test("requiresFreeCourseEmailGate matches ui-ux track only", () => {
  assert.equal(requiresFreeCourseEmailGate({ slug: "ui-ux" }), true);
  assert.equal(requiresFreeCourseEmailGate({ slug: "genai" }), false);
  assert.equal(isEmailGatedCourseSlug("ui-ux"), true);
});
