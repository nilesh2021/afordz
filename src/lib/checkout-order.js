import { hasVerifiedPrice, getProductById, isAffiliateProduct, isCatalogueVisible } from "../data/products.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildCheckoutOrder(body) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const productIds = Array.isArray(body?.productIds) ? body.productIds : [];

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Enter your name." };
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (productIds.length === 0 || productIds.length > 20) {
    return { ok: false, error: "Your cart is empty." };
  }

  const seen = new Set();
  const items = [];

  for (const productId of productIds) {
    if (typeof productId !== "string" || seen.has(productId)) {
      return { ok: false, error: "The cart contains a product that cannot be sold here." };
    }
    seen.add(productId);

    const product = getProductById(productId);
    if (
      !product ||
      isAffiliateProduct(product) ||
      !isCatalogueVisible(product) ||
      !hasVerifiedPrice(product) ||
      !Number.isInteger(product.priceInr) ||
      product.priceInr < 1
    ) {
      return { ok: false, error: "The cart contains a product that cannot be sold here." };
    }

    items.push({
      id: product.id,
      name: product.name,
      priceInr: product.priceInr,
    });
  }

  const amountPaise = items.reduce((sum, item) => sum + item.priceInr * 100, 0);

  return {
    ok: true,
    name,
    email,
    items,
    amountPaise,
    currency: "INR",
  };
}
