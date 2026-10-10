import fs from "node:fs";
import path from "node:path";

const PRODUCTS = {
  "bootstrap-templates-bundle": {
    archivePath: path.join(process.cwd(), "private", "downloads", "bootstrap-templates-bundle.zip"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "bootstrap-templates-bundle.txt",
    ),
    downloadName: "bootstrap-templates-bundle",
  },
  "ui-ux-fundamentals-course": {
    archivePath: path.join(process.cwd(), "private", "downloads", "ui-ux-fundamentals-course.zip"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "ui-ux-fundamentals-course.txt",
    ),
    downloadName: "ui-ux-fundamentals-course",
  },
  "ai-video-creation-course": {
    archivePath: path.join(process.cwd(), "private", "downloads", "ai-video-creation-course.zip"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "ai-video-creation-course.txt",
    ),
    downloadName: "ai-video-creation-course",
  },
};

function safeExisting(filePath) {
  const root = path.resolve(process.cwd(), "private", "downloads");
  const resolved = path.resolve(filePath);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    return false;
  }
  return fs.existsSync(filePath);
}

export function resolveDownload(productId) {
  const entry = PRODUCTS[productId];
  if (!entry) {
    return null;
  }

  const isZip = safeExisting(entry.archivePath);
  const filePath = isZip ? entry.archivePath : safeExisting(entry.placeholderPath) ? entry.placeholderPath : null;
  if (!filePath) {
    return null;
  }

  return {
    filePath,
    downloadName: `${entry.downloadName}${isZip ? ".zip" : ".txt"}`,
    contentType: isZip ? "application/zip" : "text/plain; charset=utf-8",
  };
}
