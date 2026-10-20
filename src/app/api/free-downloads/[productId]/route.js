import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { freeDownloadCookieName } from "@/lib/free-download-cookie";
import { getFreeDownloadGrant } from "@/lib/free-download";
import { resolveDownload } from "@/lib/fulfillment";
import { getProductById, isFreeProduct } from "@/data/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!isFreeProduct(product)) {
    return NextResponse.json({ error: "This file is not available." }, { status: 404 });
  }

  const file = resolveDownload(productId);
  if (!file) {
    return NextResponse.json({ error: "This file is not available." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const cookieName = freeDownloadCookieName(productId);
  const token = cookieName ? cookieStore.get(cookieName)?.value : undefined;
  const grant = await getFreeDownloadGrant(token, productId);

  if (!grant) {
    return NextResponse.json({ error: "Enter your email on the product page to unlock this download." }, { status: 401 });
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
