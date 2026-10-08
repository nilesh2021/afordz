import fs from "node:fs";
import path from "node:path";
// Turso Cloud (2026) speaks HTTP /v3. @libsql/client uses Hrana and surfaces
// Turso's BLOCKED code when that protocol is rejected. Keep the serverless driver.
import { createClient } from "@tursodatabase/serverless/compat";
import { DatabaseSync } from "node:sqlite";
import { blockedHint, logOrderStoreError } from "./order-db-log.js";

const SCHEMA_STATEMENTS = [
  "PRAGMA journal_mode = WAL",
  "PRAGMA foreign_keys = ON",
  `CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    razorpay_order_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'paid')),
    amount_paise INTEGER NOT NULL,
    currency TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    items_json TEXT NOT NULL,
    payment_id TEXT UNIQUE,
    download_token_hash TEXT,
    download_expires_at TEXT,
    created_at TEXT NOT NULL,
    paid_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS webhook_events (
    event_id TEXT PRIMARY KEY,
    processed_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS orders_download_token_hash
    ON orders (download_token_hash)`,
];

const TURSO_SCHEMA = SCHEMA_STATEMENTS.filter((statement) => !statement.startsWith("PRAGMA"));

const SQLITE_PATH =
  process.env.AFORDZ_DB_PATH || path.join(process.cwd(), "data", "orders.sqlite");

function tursoUrl() {
  return process.env.TURSO_DATABASE_URL?.trim() || "";
}

function tursoAuthToken() {
  return process.env.TURSO_AUTH_TOKEN?.trim() || "";
}

export function getOrderStoreMode() {
  if (tursoUrl()) {
    return "turso";
  }
  if (process.env.VERCEL) {
    return "unconfigured";
  }
  return "sqlite";
}

function assertStoreConfigured() {
  const mode = getOrderStoreMode();
  if (mode === "unconfigured") {
    const error = new Error(
      "Order database is not configured for Vercel. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.",
    );
    error.code = "ORDER_DB_UNCONFIGURED";
    throw error;
  }
  if (mode === "turso" && !tursoAuthToken()) {
    const error = new Error("TURSO_AUTH_TOKEN is missing. Add a full-access Turso database token.");
    error.code = "ORDER_DB_TOKEN_MISSING";
    throw error;
  }
}

function openSqliteDatabase() {
  fs.mkdirSync(path.dirname(SQLITE_PATH), { recursive: true });
  const db = new DatabaseSync(SQLITE_PATH);
  for (const statement of SCHEMA_STATEMENTS) {
    db.exec(statement);
  }
  return db;
}

function getTursoClient() {
  if (!globalThis.__afordzTursoClient) {
    globalThis.__afordzTursoClient = createClient({
      url: tursoUrl(),
      authToken: tursoAuthToken(),
    });
  }
  return globalThis.__afordzTursoClient;
}

async function initializeTurso() {
  const client = getTursoClient();
  for (const statement of TURSO_SCHEMA) {
    await client.execute(statement);
  }
}

function getSqliteDatabase() {
  if (!globalThis.__afordzOrdersDb) {
    globalThis.__afordzOrdersDb = openSqliteDatabase();
  }
  return globalThis.__afordzOrdersDb;
}

let tursoReady = false;

async function countSchemaTables() {
  const sql = (catalog) =>
    `SELECT
       SUM(CASE WHEN name = 'orders' THEN 1 ELSE 0 END) AS orders_table,
       SUM(CASE WHEN name = 'webhook_events' THEN 1 ELSE 0 END) AS webhook_table
     FROM ${catalog}
     WHERE type = 'table' AND name IN ('orders', 'webhook_events')`;
  try {
    return await dbGet(sql("sqlite_schema"));
  } catch {
    return await dbGet(sql("sqlite_master"));
  }
}

async function verifySchemaTables() {
  const row = await countSchemaTables();
  const orders = Number(row?.orders_table ?? 0) === 1;
  const webhooks = Number(row?.webhook_table ?? 0) === 1;
  if (!orders || !webhooks) {
    const error = new Error("Order schema was not initialized.");
    error.code = "ORDER_DB_SCHEMA_MISSING";
    throw error;
  }
  return { orders, webhooks };
}

export async function ensureOrderDatabase() {
  assertStoreConfigured();
  const mode = getOrderStoreMode();
  if (mode === "turso") {
    if (!tursoReady) {
      await initializeTurso();
      tursoReady = true;
    }
    return;
  }

  try {
    getSqliteDatabase();
    getSqliteDatabase().prepare("SELECT 1 AS ok").get();
  } catch (error) {
    logOrderStoreError("ensure_sqlite", error);
    throw error;
  }
}

/** Safe status for ops dashboards and GET /api/orders/health (no secrets or customer data). */
export async function probeOrderStore() {
  const store = getOrderStoreMode();
  if (store === "unconfigured") {
    return {
      ok: false,
      store,
      phase: "unconfigured",
      code: "ORDER_DB_UNCONFIGURED",
      fix: "set_turso_env_on_vercel",
    };
  }

  if (store === "turso" && !tursoAuthToken()) {
    return {
      ok: false,
      store,
      phase: "connect",
      code: "ORDER_DB_TOKEN_MISSING",
      fix: "set_turso_token",
    };
  }

  try {
    if (store === "turso") {
      await getTursoClient().execute("SELECT 1 AS ok");
    } else {
      getSqliteDatabase().prepare("SELECT 1 AS ok").get();
    }
  } catch (error) {
    logOrderStoreError("connect", error);
    const code = typeof error?.code === "string" ? error.code : "ORDER_DB_CONNECT_FAILED";
    return {
      ok: false,
      store,
      phase: "connect",
      code,
      errno: error?.errno,
      hint: code === "BLOCKED" ? blockedHint("connect") : undefined,
    };
  }

  try {
    if (store === "turso") {
      await initializeTurso();
      tursoReady = true;
    } else {
      getSqliteDatabase();
    }
    const tables = await verifySchemaTables();
    return { ok: true, store, phase: "ready", tables };
  } catch (error) {
    logOrderStoreError("schema", error);
    const code = typeof error?.code === "string" ? error.code : "ORDER_DB_SCHEMA_FAILED";
    return {
      ok: false,
      store,
      phase: "schema",
      code,
      errno: error?.errno,
      hint: code === "BLOCKED" ? blockedHint("schema") : undefined,
    };
  }
}

function sqliteGet(sql, args = []) {
  const row = getSqliteDatabase().prepare(sql).get(...args);
  return row ?? null;
}

function sqliteRun(sql, args = []) {
  const result = getSqliteDatabase().prepare(sql).run(...args);
  return { changes: result.changes };
}

async function tursoGet(sql, args = []) {
  const result = await getTursoClient().execute({ sql, args });
  return result.rows[0] ?? null;
}

async function tursoRun(sql, args = []) {
  const result = await getTursoClient().execute({ sql, args });
  return { changes: result.rowsAffected };
}

export async function dbGet(sql, args = []) {
  await ensureOrderDatabase();
  if (getOrderStoreMode() === "turso") {
    return tursoGet(sql, args);
  }
  return sqliteGet(sql, args);
}

export async function dbRun(sql, args = []) {
  await ensureOrderDatabase();
  if (getOrderStoreMode() === "turso") {
    return tursoRun(sql, args);
  }
  return sqliteRun(sql, args);
}

export async function withWriteTransaction(work) {
  await ensureOrderDatabase();
  if (getOrderStoreMode() === "turso") {
    const client = getTursoClient();
    const tx = await client.transaction("write");
    const conn = {
      get: async (sql, args = []) => {
        const result = await tx.execute({ sql, args });
        return result.rows[0] ?? null;
      },
      run: async (sql, args = []) => {
        const result = await tx.execute({ sql, args });
        return { changes: result.rowsAffected };
      },
    };
    try {
      const value = await work(conn);
      await tx.commit();
      return value;
    } catch (error) {
      try {
        await tx.rollback();
      } catch {
        // The transaction may already be closed.
      }
      throw error;
    }
  }

  const db = getSqliteDatabase();
  db.exec("BEGIN IMMEDIATE");
  const conn = {
    get: (sql, args = []) => sqliteGet(sql, args),
    run: (sql, args = []) => sqliteRun(sql, args),
  };
  try {
    const value = await work(conn);
    db.exec("COMMIT");
    return value;
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      // The transaction may already be closed.
    }
    throw error;
  }
}

export function closeDb() {
  if (globalThis.__afordzOrdersDb) {
    globalThis.__afordzOrdersDb.close();
    globalThis.__afordzOrdersDb = undefined;
  }
  if (globalThis.__afordzTursoClient) {
    try {
      globalThis.__afordzTursoClient.close();
    } catch {
      // Ignore close races during tests.
    }
    globalThis.__afordzTursoClient = undefined;
  }
  tursoReady = false;
}
