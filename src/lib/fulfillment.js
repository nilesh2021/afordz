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
  "marketing-contact-email-list": {
    archivePath: path.join(process.cwd(), "private", "downloads", "100-Email-Contact-List.pdf"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "marketing-contact-email-list.csv",
    ),
    downloadName: "100-Email-Contact-List",
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

function contentTypeFor(ext) {
  if (ext === ".zip") {
    return "application/zip";
  }
  if (ext === ".pdf") {
    return "application/pdf";
  }
  if (ext === ".csv") {
    return "text/csv; charset=utf-8";
  }
  return "text/plain; charset=utf-8";
}

export function resolveDownload(productId) {
  const entry = PRODUCTS[productId];
  if (!entry) {
    return null;
  }

  const primaryExists = safeExisting(entry.archivePath);
  const filePath = primaryExists
    ? entry.archivePath
    : safeExisting(entry.placeholderPath)
      ? entry.placeholderPath
      : null;
  if (!filePath) {
    return null;
  }

  const ext = path.extname(filePath).toLowerCase();

  return {
    filePath,
    downloadName: `${entry.downloadName}${ext}`,
    contentType: contentTypeFor(ext),
  };
}
