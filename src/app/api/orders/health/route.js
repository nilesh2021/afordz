import { NextResponse } from "next/server";
import { probeOrderStore } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIX_MESSAGES = {
  set_turso_env_on_vercel:
    "On Vercel, set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, then redeploy. See DEPLOYMENT.md in the repo.",
};

export async function GET() {
  const status = await probeOrderStore();
  const body = {
    ok: status.ok,
    store: status.store,
  };

  if (!status.ok) {
    body.code = status.code;
    if (status.fix && FIX_MESSAGES[status.fix]) {
      body.fix = status.fix;
      body.hint = FIX_MESSAGES[status.fix];
    }
    if (status.errno) {
      body.errno = status.errno;
    }
  }

  return NextResponse.json(body, { status: status.ok ? 200 : 503 });
}
