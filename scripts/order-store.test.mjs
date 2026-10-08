import assert from "node:assert/strict";
import test from "node:test";
import {
  blockedHint,
  describeOrderStoreError,
  describeTursoUrl,
  sanitizeStoreErrorMessage,
} from "../src/lib/order-db-log.js";

test("BLOCKED is forwarded from the Turso client, not invented by our health route", () => {
  const error = new Error("BLOCKED: Operation was blocked");
  error.name = "LibsqlError";
  error.code = "BLOCKED";
  error.statement = "create_orders";
  error.sqlKind = "ddl";
  const described = describeOrderStoreError("schema", error);
  assert.equal(described.code, "BLOCKED");
  assert.equal(described.phase, "schema");
  assert.equal(described.statement, "create_orders");
  assert.equal(described.sqlKind, "ddl");
  assert.match(described.message, /Operation was blocked/);
});

test("unsafe statement labels are dropped from diagnostics", () => {
  const error = new Error("blocked");
  error.statement = "DROP TABLE orders; -- customer@example.com";
  const described = describeOrderStoreError("schema", error);
  assert.equal(described.statement, undefined);
});

test("blocked schema hint names the failed statement id only", () => {
  const hint = blockedHint("schema", "create_orders");
  assert.match(hint, /create_orders/);
  assert.equal(hint.includes("CREATE TABLE"), false);
  assert.equal(blockedHint("schema", "DROP TABLE orders"), blockedHint("schema"));
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
