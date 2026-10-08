import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "private", "downloads");

const PRODUCTS = {
  "bootstrap-templates-bundle": {
    placeholderName: "bootstrap-templates-bundle.txt",
    archiveName: "bootstrap-templates-bundle.zip",
    downloadName: "afordz-bootstrap-templates-bundle",
  },
};

function insideRoot(filePath) {
  const root = path.resolve(ROOT);
  const resolved = path.resolve(filePath);
  return resolved === root || resolved.startsWith(`${root}${path.sep}`);
}

export function resolveDownload(productId) {
  const entry = PRODUCTS[productId];
  if (!entry) {
    return null;
  }

  const archivePath = path.join(ROOT, entry.archiveName);
  const placeholderPath = path.join(ROOT, entry.placeholderName);
  const filePath = fs.existsSync(archivePath) ? archivePath : placeholderPath;

  if (!insideRoot(filePath) || !fs.existsSync(filePath)) {
    return null;
  }

  const isZip = filePath === archivePath;
  return {
    filePath,
    downloadName: `${entry.downloadName}${isZip ? ".zip" : ".txt"}`,
    contentType: isZip ? "application/zip" : "text/plain; charset=utf-8",
  };
}
