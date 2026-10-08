import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const DB_PATH =
  process.env.AFORDZ_DB_PATH || path.join(process.cwd(), "data", "orders.sqlite");

function openDatabase() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS orders (
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
    );
    CREATE TABLE IF NOT EXISTS webhook_events (
      event_id TEXT PRIMARY KEY,
      processed_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS orders_download_token_hash
      ON orders (download_token_hash);
  `);
  return db;
}

export function getDb() {
  if (!globalThis.__afordzOrdersDb) {
    globalThis.__afordzOrdersDb = openDatabase();
  }
  return globalThis.__afordzOrdersDb;
}

export function closeDb() {
  if (globalThis.__afordzOrdersDb) {
    globalThis.__afordzOrdersDb.close();
    globalThis.__afordzOrdersDb = undefined;
  }
}

export function withImmediateTransaction(work) {
  const db = getDb();
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = work(db);
    db.exec("COMMIT");
    return result;
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      // The transaction may already be closed.
    }
    throw error;
  }
}
