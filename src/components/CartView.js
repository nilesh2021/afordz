"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { fieldIsPlaceholder, formatInr, getProductById } from "@/data/products";

export default function CartView() {
  const { items, ready, removeItem, totalInr } = useCart();

  if (!ready) {
    return <p className="text-zinc-600">Loading cart.</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Your cart is empty</h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-zinc-600">
          The bundle is sold as one digital licence. Add it once, then continue to checkout.
        </p>
        <div className="mt-6">
          <Button href="/products/bootstrap-templates-bundle">Explore the Bundle</Button>
        </div>
      </div>
    );
  }

  const priceIsDraft = items.some((item) => {
    const product = getProductById(item.id);
    return fieldIsPlaceholder(product, "price");
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
      <ul className="divide-y divide-zinc-200 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">
                <Link href={`/products/${item.slug}`} className="hover:text-indigo-800">
                  {item.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-zinc-600">One digital licence</p>
            </div>
            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <p className="font-semibold text-zinc-950">{formatInr(item.priceInr)}</p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-800"
              >
                Remove <span className="sr-only">{item.name}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-950">Order total</h2>
        <p className="mt-4 flex items-center justify-between text-lg font-semibold text-zinc-950">
          <span>Total</span>
          <span>{formatInr(totalInr)}</span>
        </p>
        {priceIsDraft ? (
          <p className="mt-3 text-sm leading-6 text-amber-950">
            This total uses the placeholder price. Confirm the amount in the product data before you take payment.
          </p>
        ) : null}
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          One licence per order. Tax is not added. The server prices the order again at checkout.
        </p>
        <Button href="/checkout" className="mt-6 w-full">
          Checkout
        </Button>
      </aside>
    </div>
  );
}
