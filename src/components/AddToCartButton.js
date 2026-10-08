"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ product }) {
  const { addItem, isInCart, ready } = useCart();
  const [message, setMessage] = useState("");
  const inCart = ready && isInCart(product.id);
  const status = message || (inCart ? "Already in your cart." : "");

  function handleAdd() {
    const added = addItem(product);
    setMessage(
      added
        ? "Added to cart."
        : "Already in cart. One digital licence is included per order.",
    );
  }

  return (
    <div className="relative w-full">
      {inCart ? (
        <Button
          href="/cart"
          className="w-full shadow-md shadow-indigo-700/25"
          aria-label={`View cart, ${product.name} already added`}
        >
          View cart
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleAdd}
          className="w-full shadow-md shadow-indigo-700/25"
          disabled={!ready}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </Button>
      )}
      <p
        role="status"
        className={
          status
            ? "absolute left-0 top-full z-10 mt-1 w-max max-w-full text-sm font-medium text-indigo-950"
            : "sr-only"
        }
      >
        {status}
      </p>
    </div>
  );
}
