import assert from "node:assert/strict";
import test from "node:test";
import { resolveDownload } from "../src/lib/fulfillment.js";

test("paid bundle resolves to a file under private/downloads", () => {
  const file = resolveDownload("bootstrap-templates-bundle");
  assert.ok(file);
  assert.match(file.filePath.replaceAll("\\", "/"), /private\/downloads\/bootstrap-templates-bundle\.(zip|txt)$/);
  assert.equal(file.downloadName.startsWith("bootstrap-templates-bundle"), true);
});

test("free tongue twisters PDF resolves under private/downloads", () => {
  const file = resolveDownload("500-tongue-twisters-english-pronunciation");
  assert.ok(file);
  assert.match(
    file.filePath.replaceAll("\\", "/"),
    /private\/downloads\/500-tongue-twisters-english-pronunciation\.(pdf|txt)$/,
  );
  assert.equal(file.downloadName.startsWith("500-tongue-twisters-english-pronunciation"), true);
});

test("career free ATS resume pack resolves under private/downloads", () => {
  const file = resolveDownload("free-ats-resume-template-freshers-2026");
  assert.ok(file);
  assert.match(
    file.filePath.replaceAll("\\", "/"),
    /private\/downloads\/(ATS-Resume-Template-Pack\.zip|free-ats-resume-template-freshers-2026\.txt)$/,
  );
  assert.equal(file.downloadName.startsWith("ATS-Resume-Template-Pack"), true);
});

test("career free job tracker resolves under private/downloads", () => {
  const file = resolveDownload("free-job-application-tracker");
  assert.ok(file);
  assert.match(
    file.filePath.replaceAll("\\", "/"),
    /private\/downloads\/(Job-Application-Tracker\.xlsx|free-job-application-tracker\.txt)$/,
  );
  assert.equal(file.downloadName.startsWith("Job-Application-Tracker"), true);
  if (file.downloadName.endsWith(".xlsx")) {
    assert.equal(file.contentType, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }
});

test("career free ChatGPT prompts pack resolves under private/downloads", () => {
  const file = resolveDownload("free-chatgpt-prompts-job-seekers-2026");
  assert.ok(file);
  assert.match(
    file.filePath.replaceAll("\\", "/"),
    /private\/downloads\/(AI-Prompt-Pack-for-Job-Seekers\.zip|free-chatgpt-prompts-job-seekers-2026\.txt)$/,
  );
  assert.equal(file.downloadName.startsWith("AI-Prompt-Pack-for-Job-Seekers"), true);
});

test("unknown products have no download", () => {
  assert.equal(resolveDownload("not-a-product"), null);
});
