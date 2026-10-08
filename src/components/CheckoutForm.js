"use client";

import { useState } from "react";
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
      <div className="rounded-3xl border border-zinc-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-zinc-950">Your cart is empty</h2>
        <p className="mt-3 text-zinc-600">Add the bundle before you open checkout.</p>
        <div className="mt-6">
          <Button href="/products/bootstrap-templates-bundle">Explore the Bundle</Button>
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
        setFormError(
          typeof orderPayload.error === "string"
            ? orderPayload.error
            : "The payment order could not be created.",
        );
        setPaying(false);
        return;
      }

      await loadRazorpay();
      const checkout = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "Afordz",
        description: "Digital licence (test mode)",
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
          <p className="text-sm font-semibold tracking-wide text-amber-950">Razorpay test mode</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">Live payments are off</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-800">
            Card, UPI, and bank details are entered on Razorpay, not on this page. This store accepts Razorpay test keys only. A download is created after the server confirms the payment was captured for this order, amount, and INR.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-zinc-950">Your details</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Name and email are sent to this server and to Razorpay so the test checkout can open. They are stored with the order.
          </p>

          <div className="mt-6 space-y-5">
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
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-zinc-950 ${
                  errors.name ? "border-red-700" : "border-zinc-300"
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
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-zinc-950 ${
                  errors.email ? "border-red-700" : "border-zinc-300"
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
            <p role="alert" className="mt-5 text-sm font-medium text-red-800">
              {formError}
            </p>
          ) : null}

          <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={paying}>
            {paying ? "Opening Razorpay" : "Pay with Razorpay"}
          </Button>
        </form>
      </div>

      <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-950">Order summary</h2>
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-zinc-950">{item.name}</p>
                <p className="text-sm text-zinc-600">One digital licence</p>
              </div>
              <p className="font-semibold text-zinc-950">{formatInr(item.priceInr)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 text-lg font-semibold text-zinc-950">
          <span>Total</span>
          <span>{formatInr(totalInr)}</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The server prices this order from the catalogue before it talks to Razorpay.
        </p>
        {priceIsDraft ? (
          <p className="mt-3 text-sm leading-6 text-amber-950">Placeholder price. Edit it before you sell.</p>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          <a href="/checkout/success" className="font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4">
            Retrieve a test download
          </a>
        </p>
      </aside>
    </div>
  );
}
