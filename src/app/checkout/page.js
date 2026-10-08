import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
  description:
    "Afordz checkout in Razorpay test mode. Card details stay on Razorpay. Live payments are disabled.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-amber-950">Razorpay test mode</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">Checkout</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
        Pay with Razorpay test keys. This page collects a name and email only. A download is released after the server confirms the captured payment, order, amount, and INR currency.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
