"use client";

import { useState } from "react";
import Link from "next/link";

const initialStatus = { type: "", message: "" };

export default function NewsletterSignup({ source = "footer", variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);

  const isFooter = variant === "footer";

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
              : "Signup failed. Try again in a moment.",
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
            : "You are on the Afordz list.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Signup failed. Check your connection and try again.",
      });
    }

    setSubmitting(false);
  }

  return (
    <div className={isFooter ? "w-full" : ""}>
      {isFooter ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Newsletter</p>
      ) : null}
      <p
        className={
          isFooter
            ? "mt-4 font-display text-xl tracking-tight text-surface"
            : "text-sm font-semibold text-ink"
        }
      >
        {isFooter ? "Stay in the loop" : "Product updates from Afordz"}
      </p>
      <p
        className={
          isFooter
            ? "mt-2 max-w-sm text-sm leading-6 text-surface/60"
            : "mt-1 text-sm leading-6 text-muted"
        }
      >
        {isFooter
          ? "New catalogue finds and occasional deals. Unsubscribe anytime."
          : "New finds and occasional deals. Only if you subscribe here."}
      </p>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={
          isFooter
            ? "mt-5 flex flex-col gap-3"
            : "mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch"
        }
      >
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
          Email for Afordz updates
        </label>
        <div className={isFooter ? "flex flex-col gap-3 sm:flex-row" : "contents"}>
          <input
            id={`newsletter-email-${source}`}
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
            className={
              isFooter
                ? "min-h-12 w-full flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-surface placeholder:text-surface/40 outline-none transition focus:border-accent"
                : "min-h-12 w-full flex-1 rounded-2xl border border-border bg-surface px-4 text-sm text-ink outline-none transition focus:border-accent-strong"
            }
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-accent-strong px-5 text-sm font-semibold text-surface transition hover:bg-[#5b21b6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Joining…" : "Subscribe"}
          </button>
        </div>
      </form>
      <p
        className={
          isFooter
            ? "mt-3 text-xs leading-5 text-surface/45"
            : "mt-2 text-xs leading-5 text-muted"
        }
      >
        Marketing email from Afordz only.{" "}
        <Link
          href="/privacy"
          className={isFooter ? "text-accent hover:underline" : "text-accent-strong hover:underline"}
        >
          Privacy note
        </Link>
        .
      </p>
      {status.message ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={
            status.type === "error"
              ? isFooter
                ? "mt-3 text-sm font-medium text-red-300"
                : "mt-3 text-sm font-medium text-red-800"
              : isFooter
                ? "mt-3 text-sm font-medium text-emerald-300"
                : "mt-3 text-sm font-medium text-emerald-800"
          }
        >
          {status.message}
        </p>
      ) : null}
    </div>
  );
}
