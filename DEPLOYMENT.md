# Deploying checkout (afordz.in)

Checkout stores pending and paid orders in a database **before** Razorpay Checkout opens. Payment verification and webhook deduplication read the same store.

## Why Vercel needs Turso

`afordz.in` is served from **Vercel** (`Server: Vercel`). Serverless deployments use a **read-only** application filesystem. The default local path `data/orders.sqlite` cannot be created or updated there, which surfaces to customers as:

> The order could not be saved. Nothing was charged.

Server logs (no PII) look like:

```json
{"phase":"insert_pending","store":"sqlite","code":"EROFS","syscall":"open","message":"..."}
```

or `EACCES` / `read-only file system` on `mkdir` / `open`.

**Do not** point SQLite at `/tmp` on Vercel: it is not shared across regions or invocations and is wiped on redeploy.

## Production (Vercel + Turso)

1. Create a [Turso](https://turso.tech) database (SQLite-compatible, persistent).
2. In the Vercel project → **Settings → Environment Variables**, add for **Production** (and Preview if you test checkout there):
   - `TURSO_DATABASE_URL` — `libsql://…` from Turso
   - `TURSO_AUTH_TOKEN` — database token from Turso
3. Keep existing Razorpay variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`).
4. Redeploy. On first order, the app runs the same `CREATE TABLE IF NOT EXISTS` migrations as local SQLite.

Orders then survive **restarts**, **redeploys**, and **cold starts** because they live in Turso, not on the function disk.

### Verifying persistence

1. Complete a test checkout (Razorpay test keys) or insert a row via Turso CLI.
2. Redeploy the Vercel project or wait for a cold start.
3. Use **Retrieve a download** on `/checkout/success` with the same email and `pay_…` id — the order should still resolve.

### Safe logs

Failed saves log a single JSON line prefixed with `[afordz:orders]`: `phase`, `store`, `code`, `errno`, `syscall`, and a truncated `message`. Customer name, email, and tokens are not logged.

## Self-hosted Node (VPS, Docker, PM2)

Use file-backed SQLite on a **persistent volume**:

1. Create a writable directory, e.g. `/var/lib/afordz`.
2. Set `AFORDZ_DB_PATH=/var/lib/afordz/orders.sqlite`.
3. Run the app as a user that owns that directory (`chown` / `chmod 750`).
4. Mount the directory in Docker (`-v afordz-data:/var/lib/afordz`).
5. **Do not** set `TURSO_*` unless you intentionally use Turso from the VPS.

Requires **Node.js 22.11+** for built-in `node:sqlite` (see `engines` in `package.json`).

Back up `orders.sqlite` (and `-wal` / `-shm` if present) with your normal volume snapshots.

## Local development

- Copy `.env.example` to `.env.local`.
- Omit `TURSO_*` — the app uses `data/orders.sqlite` (gitignored).
- Run `node --test scripts/payments.test.mjs` after payment changes.
