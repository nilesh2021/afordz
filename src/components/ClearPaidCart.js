"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

export default function ClearPaidCart() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) {
      clear();
    }
  }, [ready, clear]);

  return null;
}
