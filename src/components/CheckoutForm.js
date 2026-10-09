"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { fieldIsPlaceholder, formatInr, getProductById } from "@/data/products";

const initialValues = { name: "", email: "" };

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (name.length < 2) {
    errors.name = "Enter your name.";
  } else if (name.length > 80) {
    errors.name = "Use a name of 80 characters or fewer.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function loadRazorpay() {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("checkout_script"));
    document.body.appendChild(script);
  });
}

export default function CheckoutForm() {
  const { items, ready, totalInr, clear } = useCart();
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [paying, setPaying] = useState(false);

  if (!ready) {
    return <p className="text-zinc-600">Loading checkout.</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-[0_20px_50px_rgb(20_18_28/0.06)] sm:p-10">
        <h2 className="font-display text-3xl tracking-tight text-zinc-950">Your cart is empty</h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-zinc-600">Add a product before you open checkout.</p>
        <div className="mt-6">
          <Button href="/shop">Browse the catalogue</Button>
        </div>
      </div>
    );
  }

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setPaying(true);
    setFormError("");

    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          productIds: items.map((item) => item.id),
        }),
      });
      const orderPayload = await orderResponse.json().catch(() => ({}));
      if (!orderResponse.ok) {
        const message =
          typeof orderPayload.error === "string"
            ? orderPayload.error
            : "The payment order could not be created.";
        const hint = typeof orderPayload.hint === "string" ? orderPayload.hint : "";
        setFormError(hint ? `${message} ${hint}` : message);
        setPaying(false);
        return;
      }

      await loadRazorpay();
      const checkout = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "Afordz",
        description: "Digital licence",
        order_id: orderPayload.razorpayOrderId,
        prefill: {
          name: values.name.trim(),
          email: values.email.trim(),
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verifyResponse.ok) {
              const verifyPayload = await verifyResponse.json().catch(() => ({}));
              setFormError(
                typeof verifyPayload.error === "string"
                  ? verifyPayload.error
                  : "The payment could not be verified.",
              );
              setPaying(false);
              return;
            }
            clear();
            router.push("/checkout/success");
          } catch {
            setFormError("The payment could not be verified. No download was created.");
            setPaying(false);
          }
        },
        modal: {
          ondismiss() {
            setPaying(false);
          },
        },
        theme: { color: "#4338ca" },
      });
      checkout.on("payment.failed", () => {
        setFormError("The payment was not captured. No download was created.");
        setPaying(false);
      });
      checkout.open();
    } catch {
      setFormError("Razorpay Checkout could not be opened. Nothing was charged.");
      setPaying(false);
    }
  }

  const priceIsDraft = items.some((item) =>
    fieldIsPlaceholder(getProductById(item.id), "price"),
  );

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
      <form noValidate onSubmit={handleSubmit} className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_rgb(20_18_28/0.06)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-800">Step 2</p>
        <h2 className="mt-2 font-display text-2xl tracking-tight text-zinc-950">Your details</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Name and email are sent to this server and to Razorpay so checkout can open. They are stored with the order.
        </p>

        <div className="mt-7 space-y-5">
          <div>
            <label htmlFor="customer-name" className="block text-sm font-semibold text-zinc-950">
              Name
            </label>
            <input
              id="customer-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "customer-name-error" : undefined}
              className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3.5 text-zinc-950 outline-none transition ${
                errors.name ? "border-red-700" : "border-zinc-200 focus:border-indigo-500"
              }`}
            />
            {errors.name ? (
              <p id="customer-name-error" className="mt-2 text-sm font-medium text-red-800">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="customer-email" className="block text-sm font-semibold text-zinc-950">
              Email
            </label>
            <input
              id="customer-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "customer-email-error" : undefined}
              className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3.5 text-zinc-950 outline-none transition ${
                errors.email ? "border-red-700" : "border-zinc-200 focus:border-indigo-500"
              }`}
            />
            {errors.email ? (
              <p id="customer-email-error" className="mt-2 text-sm font-medium text-red-800">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        {formError ? (
          <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="mt-7 w-full" disabled={paying}>
          {paying ? "Opening Razorpay" : `Pay ${formatInr(totalInr)} with Razorpay`}
        </Button>
        <p className="mt-4 text-center text-xs leading-5 text-zinc-600">
          Payment methods open in the Razorpay window. Nothing is charged until that payment is captured.
        </p>
      </form>

      <aside className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-900/10 bg-white shadow-[0_24px_60px_rgb(20_18_28/0.08)]">
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Order</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-zinc-950">Summary</h2>
            <ul className="mt-6 space-y-5">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium leading-6 text-zinc-950">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-600">One digital licence</p>
                  </div>
                  <p className="shrink-0 font-semibold text-zinc-950">{formatInr(item.priceInr)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-zinc-200 pt-5">
              <span className="text-sm text-zinc-600">Total, INR</span>
              <span className="font-display text-3xl tracking-tight text-zinc-950">{formatInr(totalInr)}</span>
            </div>
          </div>
          <div className="space-y-4 border-t border-indigo-100 bg-indigo-50 px-6 py-5 sm:px-7">
            <p className="text-sm leading-6 text-zinc-600">The server prices this order from the catalogue before it talks to Razorpay.</p>
            {priceIsDraft ? (
              <p className="text-sm font-medium text-amber-950">Placeholder price. Edit it before you sell.</p>
            ) : null}
            <Link
              href="/checkout/success"
              className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-white px-4 py-3.5 shadow-sm transition hover:border-indigo-400"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-700 text-white">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                  <path
                    d="M12 4v10m0 0 4-4m-4 4-4-4M5 18.5h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-sm font-semibold text-zinc-950">Retrieve a download</span>
                <span className="mt-0.5 block text-xs leading-5 text-zinc-600">Already paid? Look it up with your payment id.</span>
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
