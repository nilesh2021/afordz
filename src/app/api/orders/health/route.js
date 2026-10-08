import { NextResponse } from "next/server";
import { probeOrderStore } from "@/lib/db";
import { blockedHint } from "@/lib/order-db-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIX_MESSAGES = {
  set_turso_env_on_vercel:
    "On Vercel, set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, then redeploy. See DEPLOYMENT.md in the repo.",
  set_turso_token:
    "TURSO_DATABASE_URL is set but TURSO_AUTH_TOKEN is missing. Add a full-access Turso database token and redeploy.",
};

export async function GET() {
  const status = await probeOrderStore();
  const body = {
    ok: status.ok,
    store: status.store,
  };

  if (status.phase) {
    body.phase = status.phase;
  }
  if (status.tables) {
    body.tables = status.tables;
  }
  if (status.statement) {
    body.statement = status.statement;
  }
  if (status.sqlKind) {
    body.sqlKind = status.sqlKind;
  }

  if (!status.ok) {
    body.code = status.code;
    if (status.fix && FIX_MESSAGES[status.fix]) {
      body.fix = status.fix;
      body.hint = FIX_MESSAGES[status.fix];
    } else if (status.code === "BLOCKED") {
      body.hint = status.hint || blockedHint(status.phase, status.statement);
    } else if (status.hint) {
      body.hint = status.hint;
    }
    if (status.errno) {
      body.errno = status.errno;
    }
  }

  return NextResponse.json(body, { status: status.ok ? 200 : 503 });
}
