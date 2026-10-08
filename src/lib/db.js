import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { DatabaseSync } from "node:sqlite";
import { logOrderStoreError } from "./order-db-log.js";

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

const SQLITE_PATH =
  process.env.AFORDZ_DB_PATH || path.join(process.cwd(), "data", "orders.sqlite");

export function getOrderStoreMode() {
  if (process.env.TURSO_DATABASE_URL) {
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
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return globalThis.__afordzTursoClient;
}

async function initializeTurso() {
  const client = getTursoClient();
  for (const statement of SCHEMA_STATEMENTS) {
    if (statement.startsWith("PRAGMA")) {
      continue;
    }
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

/** Safe status for ops dashboards and GET /api/orders/health (no secrets or customer data). */
export async function probeOrderStore() {
  const store = getOrderStoreMode();
  if (store === "unconfigured") {
    return {
      ok: false,
      store,
      code: "ORDER_DB_UNCONFIGURED",
      fix: "set_turso_env_on_vercel",
    };
  }

  try {
    await ensureOrderDatabase();
    if (store === "turso") {
      await getTursoClient().execute("SELECT 1 AS ok");
    } else {
      getSqliteDatabase().prepare("SELECT 1 AS ok").get();
    }
    return { ok: true, store };
  } catch (error) {
    logOrderStoreError("probe", error);
    return {
      ok: false,
      store,
      code: typeof error?.code === "string" ? error.code : "ORDER_DB_PROBE_FAILED",
      errno: error?.errno,
    };
  }
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
      await tx.rollback();
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
  globalThis.__afordzTursoClient = undefined;
  tursoReady = false;
}
