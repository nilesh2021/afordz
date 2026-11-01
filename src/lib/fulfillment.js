import fs from "node:fs";
import path from "node:path";

const DOWNLOADS_ROOT = path.join(process.cwd(), "private", "downloads");

function downloadPath(fileName) {
  return path.join(DOWNLOADS_ROOT, fileName);
}

/** productId → files in private/downloads (first existing archive is served). */
const PRODUCTS = {
  "bootstrap-templates-bundle": {
    archivePaths: [downloadPath("bootstrap-templates-bundle.zip")],
    placeholderPath: downloadPath("bootstrap-templates-bundle.txt"),
    downloadName: "bootstrap-templates-bundle",
  },
  "ui-ux-fundamentals-course": {
    archivePaths: [downloadPath("ui-ux-fundamentals-course.zip")],
    placeholderPath: downloadPath("ui-ux-fundamentals-course.txt"),
    downloadName: "ui-ux-fundamentals-course",
  },
  "ai-video-creation-course": {
    archivePaths: [downloadPath("ai-video-creation-course.zip")],
    placeholderPath: downloadPath("ai-video-creation-course.txt"),
    downloadName: "ai-video-creation-course",
  },
  "genai-learning-syllabus": {
    archivePaths: [downloadPath("genai-learning-syllabus.docx")],
    placeholderPath: downloadPath("genai-learning-syllabus.txt"),
    downloadName: "genai-learning-syllabus",
  },
  "500-tongue-twisters-english-pronunciation": {
    archivePaths: [downloadPath("500-tongue-twisters-english-pronunciation.pdf")],
    placeholderPath: downloadPath("500-tongue-twisters-english-pronunciation.txt"),
    downloadName: "500-tongue-twisters-english-pronunciation",
  },
  "free-ats-resume-template-freshers-2026": {
    archivePaths: [downloadPath("ATS-Resume-Template-Pack.zip")],
    placeholderPath: downloadPath("free-ats-resume-template-freshers-2026.txt"),
    downloadName: "ATS-Resume-Template-Pack",
  },
  "free-job-application-tracker": {
    archivePaths: [downloadPath("Job-Application-Tracker.xlsx")],
    placeholderPath: downloadPath("free-job-application-tracker.txt"),
    downloadName: "Job-Application-Tracker",
  },
  "free-chatgpt-prompts-job-seekers-2026": {
    archivePaths: [
      downloadPath("AI-Prompt-Pack-for-Job-Seekers.zip"),
      downloadPath("free-chatgpt-prompts-job-seekers-2026.pdf"),
    ],
    placeholderPath: downloadPath("free-chatgpt-prompts-job-seekers-2026.txt"),
    downloadName: "AI-Prompt-Pack-for-Job-Seekers",
  },
};

function safeExisting(filePath) {
  const resolved = path.resolve(filePath);
  if (resolved !== DOWNLOADS_ROOT && !resolved.startsWith(`${DOWNLOADS_ROOT}${path.sep}`)) {
    return false;
  }
  return fs.existsSync(filePath);
}

function pickFilePath(entry) {
  for (const candidate of entry.archivePaths ?? []) {
    if (safeExisting(candidate)) {
      return candidate;
    }
  }
  if (entry.placeholderPath && safeExisting(entry.placeholderPath)) {
    return entry.placeholderPath;
  }
  return null;
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

  const filePath = pickFilePath(entry);
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
