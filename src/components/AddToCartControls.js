"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";

export default function AddToCartControls({ product }) {
  const { addItem, isInCart, ready } = useCart();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const inCart = ready && isInCart(product.id);

  function handleAdd() {
    const added = addItem(product);
    setMessage(
      added
        ? "Added to cart."
        : "Already in cart. One digital licence is included per order.",
    );
  }

  function handleBuyNow() {
    addItem(product);
    router.push("/checkout");
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        {inCart ? (
          <Button href="/cart" className="sm:flex-1">
            View cart
          </Button>
        ) : (
          <Button type="button" onClick={handleAdd} className="sm:flex-1" disabled={!ready}>
            Add to Cart
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={handleBuyNow}
          className="sm:flex-1"
          disabled={!ready}
        >
          Buy Now
        </Button>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm font-medium text-indigo-950">
        {message ||
          (inCart
            ? "Already in cart. One digital licence is included per order."
            : "One digital licence per order.")}
      </p>
      <p className="text-sm leading-6 text-zinc-600">
        Adding this licence does not download the archive. The file is released only after the server confirms a captured test payment.
      </p>
    </div>
  );
}
