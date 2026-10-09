import CheckoutForm from "@/components/CheckoutForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Checkout",
  description:
    "Afordz checkout with Razorpay. Card details stay on Razorpay. A download opens after the server confirms the captured payment.",
  path: "/checkout",
  index: false,
});

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">Secure checkout</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Name and email only. Card, UPI, and bank details stay on Razorpay. A download opens after the server confirms the captured payment for this order, amount, and INR.
        </p>
      </div>
      <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
        <li className="rounded-full bg-surface/80 px-3 py-1.5 text-muted ring-1 ring-border">1. Cart</li>
        <li aria-hidden="true" className="text-muted/70">/</li>
        <li className="rounded-full bg-accent-strong px-3 py-1.5 text-surface">2. Details</li>
        <li aria-hidden="true" className="text-muted/70">/</li>
        <li className="rounded-full bg-surface/80 px-3 py-1.5 text-muted ring-1 ring-border">3. Razorpay</li>
      </ol>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
