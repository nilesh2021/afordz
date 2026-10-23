"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialStatus = { type: "", message: "" };

export default function FreeCourseUnlockForm({ courseSlug, courseTitle }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(initialStatus);

    try {
      const response = await fetch("/api/free-course/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), courseSlug }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            typeof payload.error === "string"
              ? payload.error
              : "Unlock failed. Try again in a moment.",
        });
        setSubmitting(false);
        return;
      }

      setEmail("");
      setStatus({
        type: "success",
        message:
          typeof payload.message === "string"
            ? payload.message
            : "Course unlocked.",
      });
      router.refresh();
    } catch {
      setStatus({
        type: "error",
        message: "Unlock failed. Check your connection and try again.",
      });
    }

    setSubmitting(false);
  }

  return (
    <div
      id="unlock"
      className="scroll-mt-24 rounded-[1.75rem] border border-accent/40 bg-accent/10 px-5 py-5 sm:px-6 sm:py-6"
    >
      <p className="text-sm font-semibold text-ink">Unlock the free course</p>
      <p className="mt-1 text-sm leading-6 text-muted">
        Enter your email to open {courseTitle}. Free — no payment.
      </p>
      <form noValidate onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor={`free-course-email-${courseSlug}`}>
          Email to unlock {courseTitle}
        </label>
        <input
          id={`free-course-email-${courseSlug}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.type) {
              setStatus(initialStatus);
            }
          }}
          placeholder="you@example.com"
          className="min-h-12 w-full flex-1 rounded-2xl border border-border bg-surface px-4 text-sm text-ink outline-none transition focus:border-accent-strong"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-accent-strong px-5 text-sm font-semibold text-surface transition hover:bg-[#5b21b6] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Unlocking…" : "Unlock course"}
        </button>
      </form>
      <p className="mt-2 text-xs leading-5 text-muted">
        We&apos;ll email you about this course and occasional Afordz updates.{" "}
        <Link href="/privacy" className="text-accent-strong hover:underline">
          Privacy note
        </Link>
        .
      </p>
      {status.message ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={
            status.type === "error"
              ? "mt-3 text-sm font-medium text-red-800"
              : "mt-3 text-sm font-medium text-emerald-800"
          }
        >
          {status.message}
        </p>
      ) : null}
    </div>
  );
}
