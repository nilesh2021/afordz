import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
  description:
    "Afordz checkout with Razorpay. Card details stay on Razorpay. A download opens after the server confirms the captured payment.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-800">Secure checkout</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-zinc-950 sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          Name and email only. Card, UPI, and bank details stay on Razorpay. A download opens after the server confirms the captured payment for this order, amount, and INR.
        </p>
      </div>
      <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
        <li className="rounded-full bg-white/80 px-3 py-1.5 text-zinc-500 ring-1 ring-zinc-200">1. Cart</li>
        <li aria-hidden="true" className="text-zinc-400">/</li>
        <li className="rounded-full bg-indigo-700 px-3 py-1.5 text-white">2. Details</li>
        <li aria-hidden="true" className="text-zinc-400">/</li>
        <li className="rounded-full bg-white/80 px-3 py-1.5 text-zinc-500 ring-1 ring-zinc-200">3. Razorpay</li>
      </ol>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
