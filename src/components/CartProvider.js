"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { getProductById, isPurchasable } from "@/data/products";

const STORAGE_KEY = "afordz-cart";
const EMPTY_CART = [];
const listeners = new Set();
let snapshot = EMPTY_CART;

const CartContext = createContext(null);

function sameCart(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((item, index) => {
    const other = right[index];
    return (
      item.id === other.id &&
      item.slug === other.slug &&
      item.name === other.name &&
      item.priceInr === other.priceInr
    );
  });
}

function normalize(items) {
  const seen = new Set();
  const next = [];

  for (const item of items) {
    if (!item || typeof item.id !== "string" || seen.has(item.id)) {
      continue;
    }
    const product = getProductById(item.id);
    if (!isPurchasable(product)) {
      continue;
    }
    seen.add(item.id);
    next.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceInr: product.priceInr,
    });
  }

  return next;
}

function readCart() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return EMPTY_CART;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY_CART;
    }
    return normalize(parsed);
  } catch {
    return EMPTY_CART;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  const next = readCart();
  if (!sameCart(snapshot, next)) {
    snapshot = next;
  }
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function writeCart(items) {
  const next = normalize(items);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
  snapshot = next;
  emit();
}

function subscribeHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getServerHydratedSnapshot() {
  return false;
}

function toCartItem(product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    priceInr: product.priceInr,
  };
}

export function CartProvider({ children }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribeHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const addItem = useCallback((product) => {
    if (!isPurchasable(product)) {
      return false;
    }
    const current = getSnapshot();
    if (current.some((item) => item.id === product.id)) {
      return false;
    }
    writeCart([...current, toCartItem(product)]);
    return true;
  }, []);

  const removeItem = useCallback((id) => {
    writeCart(getSnapshot().filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    writeCart([]);
  }, []);

  const isInCart = useCallback(
    (id) => items.some((item) => item.id === id),
    [items],
  );

  const totalInr = items.reduce((sum, item) => sum + item.priceInr, 0);

  const value = {
    items,
    ready,
    count: items.length,
    totalInr,
    addItem,
    removeItem,
    clear,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
