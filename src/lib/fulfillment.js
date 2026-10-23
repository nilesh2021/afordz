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
  "genai-learning-syllabus": {
    archivePath: path.join(process.cwd(), "private", "downloads", "genai-learning-syllabus.docx"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "genai-learning-syllabus.txt",
    ),
    downloadName: "genai-learning-syllabus",
  },
  "500-tongue-twisters-english-pronunciation": {
    archivePath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "500-tongue-twisters-english-pronunciation.pdf",
    ),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "500-tongue-twisters-english-pronunciation.txt",
    ),
    downloadName: "500-tongue-twisters-english-pronunciation",
  },
  "free-ats-resume-template-freshers-2026": {
    archivePath: path.join(process.cwd(), "private", "downloads", "ATS-Resume-Template-Pack.zip"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "free-ats-resume-template-freshers-2026.txt",
    ),
    downloadName: "ATS-Resume-Template-Pack",
  },
  "free-job-application-tracker": {
    archivePath: path.join(process.cwd(), "private", "downloads", "Job-Application-Tracker.xlsx"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "free-job-application-tracker.txt",
    ),
    downloadName: "Job-Application-Tracker",
  },
  "free-chatgpt-prompts-job-seekers-2026": {
    archivePath: path.join(process.cwd(), "private", "downloads", "AI-Prompt-Pack-for-Job-Seekers.zip"),
    placeholderPath: path.join(
      process.cwd(),
      "private",
      "downloads",
      "free-chatgpt-prompts-job-seekers-2026.txt",
    ),
    downloadName: "AI-Prompt-Pack-for-Job-Seekers",
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
  if (ext === ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (ext === ".csv") {
    return "text/csv; charset=utf-8";
  }
  if (ext === ".xlsx") {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
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
