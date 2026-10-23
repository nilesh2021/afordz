"use client";

import { useState } from "react";
import Link from "next/link";
import { productTitle } from "@/data/products";

const initialStatus = { type: "", message: "" };

export default function ProductWaitlistSignup({ product }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const source = `waitlist:${product.id}`;
  const title = productTitle(product);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(initialStatus);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            typeof payload.error === "string"
              ? payload.error
              : "Waitlist signup failed. Try again in a moment.",
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
            : "You are on the waitlist. We will email you when this listing goes live.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Waitlist signup failed. Check your connection and try again.",
      });
    }

    setSubmitting(false);
  }

  return (
    <div
      id="waitlist"
      className="mt-6 scroll-mt-24 rounded-2xl border border-accent/35 bg-accent/10 px-4 py-4 sm:px-5 sm:py-5"
    >
      <p className="text-sm font-semibold text-ink">Coming soon</p>
      <p className="mt-1 text-sm leading-6 text-muted">
        Checkout is not open yet for {title}. Join the waitlist and we will email you when you can
        purchase.
      </p>
      <form noValidate onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor={`waitlist-email-${product.id}`}>
          Email for waitlist: {title}
        </label>
        <input
          id={`waitlist-email-${product.id}`}
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
          {submitting ? "Joining…" : "Join waitlist"}
        </button>
      </form>
      <p className="mt-2 text-xs leading-5 text-muted">
        One email when this listing launches.{" "}
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
