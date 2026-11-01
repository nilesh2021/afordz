import assert from "node:assert/strict";
import test from "node:test";
import { validateDownloadEventInput } from "../src/lib/download-events.js";

test("validateDownloadEventInput accepts free download event", () => {
  const result = validateDownloadEventInput({
    productId: "free-ats-resume-template-freshers-2026",
    email: "User@Example.com",
    channel: "free",
  });
  assert.equal(result.ok, true);
  assert.equal(result.email, "user@example.com");
  assert.equal(result.orderId, null);
});

test("validateDownloadEventInput accepts paid download event with order id", () => {
  const result = validateDownloadEventInput({
    productId: "bootstrap-templates-bundle",
    email: "buyer@example.com",
    channel: "paid",
    orderId: "ord_abc123",
  });
  assert.equal(result.ok, true);
  assert.equal(result.channel, "paid");
  assert.equal(result.orderId, "ord_abc123");
});

test("validateDownloadEventInput rejects paid without order id", () => {
  const result = validateDownloadEventInput({
    productId: "bootstrap-templates-bundle",
    email: "buyer@example.com",
    channel: "paid",
  });
  assert.equal(result.ok, false);
});

test("validateDownloadEventInput rejects invalid email", () => {
  const result = validateDownloadEventInput({
    productId: "free-job-application-tracker",
    email: "not-an-email",
    channel: "free",
  });
  assert.equal(result.ok, false);
});
