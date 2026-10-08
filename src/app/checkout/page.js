import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
  description:
    "Afordz checkout with Razorpay. Card details stay on Razorpay. A download opens after the server confirms the captured payment.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-amber-950">Razorpay</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">Checkout</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
        This page collects a name and email only. Card details stay on Razorpay. A download is released after the server confirms the captured payment, order, amount, and INR currency.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
