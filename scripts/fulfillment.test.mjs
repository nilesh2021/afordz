import assert from "node:assert/strict";
import test from "node:test";
import { resolveDownload } from "../src/lib/fulfillment.js";

test("paid bundle resolves to a file under private/downloads", () => {
  const file = resolveDownload("bootstrap-templates-bundle");
  assert.ok(file);
  assert.match(file.filePath.replaceAll("\\", "/"), /private\/downloads\/bootstrap-templates-bundle\.(zip|txt)$/);
  assert.equal(file.downloadName.startsWith("afordz-bootstrap-templates-bundle"), true);
});

test("unknown products have no download", () => {
  assert.equal(resolveDownload("not-a-product"), null);
});
