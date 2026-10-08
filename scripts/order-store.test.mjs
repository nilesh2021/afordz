import assert from "node:assert/strict";
import test from "node:test";
import {
  describeOrderStoreError,
  describeTursoUrl,
  sanitizeStoreErrorMessage,
} from "../src/lib/order-db-log.js";

test("BLOCKED is forwarded from the Turso client, not invented by our health route", () => {
  const error = new Error("BLOCKED: Operation was blocked");
  error.name = "LibsqlError";
  error.code = "BLOCKED";
  const described = describeOrderStoreError("schema", error);
  assert.equal(described.code, "BLOCKED");
  assert.equal(described.phase, "schema");
  assert.match(described.message, /Operation was blocked/);
});

test("sanitizer strips tokens, urls, and emails from database errors", () => {
  const message = sanitizeStoreErrorMessage(
    "BLOCKED: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.aaa.bbb failed for libsql://orders-acme.turso.io user buyer@example.com authToken=super-secret",
  );
  assert.equal(message.includes("eyJ"), false);
  assert.equal(message.includes("libsql://"), false);
  assert.equal(message.includes("buyer@example.com"), false);
  assert.equal(message.includes("super-secret"), false);
  assert.match(message, /BLOCKED/);
});

test("Turso URL metadata never includes the hostname", () => {
  const meta = describeTursoUrl("libsql://secret-db-name-org.turso.io");
  assert.deepEqual(meta, {
    urlPresent: true,
    urlScheme: "libsql",
    urlHostKind: "turso.io",
  });
  assert.equal(JSON.stringify(meta).includes("secret-db"), false);
});
