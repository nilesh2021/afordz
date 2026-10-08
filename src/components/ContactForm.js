"use client";

import { useState } from "react";
import Button from "@/components/Button";

const initialValues = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Enter a message of at least 10 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSent(Object.keys(nextErrors).length === 0);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-8 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_16px_40px_rgb(20_18_28/0.06)] sm:p-8">
      <h2 className="font-display text-3xl text-zinc-950">Draft contact form</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        This form does not send email. It is here so the page can be wired up later.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-zinc-950">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-zinc-950 ${
              errors.name ? "border-red-700" : "border-zinc-300"
            }`}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-sm font-medium text-red-800">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-zinc-950">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-zinc-950 ${
              errors.email ? "border-red-700" : "border-zinc-300"
            }`}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-sm font-medium text-red-800">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold text-zinc-950">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-zinc-950 ${
              errors.message ? "border-red-700" : "border-zinc-300"
            }`}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-sm font-medium text-red-800">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" className="mt-6">
        Submit draft message
      </Button>

      {sent ? (
        <p role="status" className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          This draft form did not send your message. Replace the placeholder email on this page with a real inbox, then connect the form to that mailbox.
        </p>
      ) : null}
    </form>
  );
}
