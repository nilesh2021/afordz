import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DOWNLOAD_COOKIE } from "@/lib/download-cookie";
import { resolveDownload } from "@/lib/fulfillment";
import { getPaidOrderByToken } from "@/lib/orders";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { productId } = await params;
  const file = resolveDownload(productId);
  if (!file) {
    return NextResponse.json({ error: "This file is not available." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(DOWNLOAD_COOKIE)?.value;
  const order = await getPaidOrderByToken(token);
  const ownsProduct = order?.items?.some((item) => item.id === productId);

  if (!ownsProduct) {
    return NextResponse.json({ error: "The download link has expired." }, { status: 401 });
  }

  const stream = Readable.toWeb(createReadStream(file.filePath));
  return new NextResponse(stream, {
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.downloadName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
