"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";

const initialStatus = { type: "", message: "" };

export default function FreeDownloadControls({ product }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const downloadHref = `/api/free-downloads/${product.id}`;
  const ctaLabel = product.freeCtaLabel ?? "Get free download";
  const downloadLabel = product.freeDownloadLabel ?? "Download file";

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(initialStatus);

    try {
      const response = await fetch("/api/free-download/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), productId: product.id }),
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

      setUnlocked(true);
      setStatus({
        type: "success",
        message:
          typeof payload.message === "string"
            ? payload.message
            : "Your download link is ready.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Unlock failed. Check your connection and try again.",
      });
    }

    setSubmitting(false);
  }

  return (
    <div className="mt-8">
      {unlocked ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={downloadHref} className="sm:flex-1">
            {downloadLabel}
          </Button>
          <Button href="/shop" variant="secondary" className="sm:flex-1">
            Back to shop
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <label className="sr-only" htmlFor={`free-download-email-${product.id}`}>
            Email to unlock download
          </label>
          <input
            id={`free-download-email-${product.id}`}
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
          <Button type="submit" className="sm:shrink-0" disabled={submitting}>
            {submitting ? "Unlocking…" : ctaLabel}
          </Button>
        </form>
      )}
      <p className="mt-3 text-sm leading-6 text-muted">
        Free download. Enter your email to unlock the file for 48 hours on this device. No cart or Razorpay
        checkout.{" "}
        <Link href="/privacy" className="font-semibold text-ink underline decoration-accent underline-offset-4">
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
