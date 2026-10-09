import CartView from "@/components/CartView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review the digital licence in your Afordz cart before Razorpay checkout.",
  path: "/cart",
  index: false,
});

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Cart</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        One digital licence per order. The cart is saved in this browser and is not an account.
      </p>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
