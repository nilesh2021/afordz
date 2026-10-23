import assert from "node:assert/strict";
import test from "node:test";
import {
  getProductById,
  isFreeProduct,
  isPurchasable,
} from "../src/data/products.js";
import { validateFreeUnlockInput } from "../src/lib/free-download.js";
import { freeDownloadCookieName } from "../src/lib/free-download-cookie.js";
import { validateNewsletterInput } from "../src/lib/newsletter.js";

const CAREER_FREE_IDS = [
  "free-ats-resume-template-freshers-2026",
  "free-job-application-tracker",
  "free-chatgpt-prompts-job-seekers-2026",
];

test("tongue twisters listing is free and not purchasable", () => {
  const product = getProductById("500-tongue-twisters-english-pronunciation");
  assert.ok(product);
  assert.equal(isFreeProduct(product), true);
  assert.equal(isPurchasable(product), false);
});

test("paid direct product is not free", () => {
  const product = getProductById("bootstrap-templates-bundle");
  assert.equal(isFreeProduct(product), false);
  assert.equal(isPurchasable(product), true);
});

test("validateFreeUnlockInput rejects unknown product", () => {
  const result = validateFreeUnlockInput({
    email: "reader@example.com",
    productId: "bootstrap-templates-bundle",
  });
  assert.equal(result.ok, false);
});

test("validateFreeUnlockInput accepts free product email", () => {
  const result = validateFreeUnlockInput({
    email: "reader@example.com",
    productId: "500-tongue-twisters-english-pronunciation",
  });
  assert.equal(result.ok, true);
  assert.equal(result.productId, "500-tongue-twisters-english-pronunciation");
});

test("newsletter allows free-download product source", () => {
  const result = validateNewsletterInput({
    email: "reader@example.com",
    source: "free-download:500-tongue-twisters-english-pronunciation",
  });
  assert.equal(result.ok, true);
});

test("newsletter rejects free-download source for paid product", () => {
  const result = validateNewsletterInput({
    email: "reader@example.com",
    source: "free-download:bootstrap-templates-bundle",
  });
  assert.equal(result.ok, false);
});

for (const productId of CAREER_FREE_IDS) {
  test(`career free listing ${productId} is not purchasable`, () => {
    const product = getProductById(productId);
    assert.ok(product);
    assert.equal(isFreeProduct(product), true);
    assert.equal(isPurchasable(product), false);
    assert.ok(typeof product.freeCtaLabel === "string" && product.freeCtaLabel.length > 0);
  });

  test(`newsletter allows free-download source for ${productId}`, () => {
    const result = validateNewsletterInput({
      email: "reader@example.com",
      source: `free-download:${productId}`,
    });
    assert.equal(result.ok, true);
  });
}

test("free download cookies are scoped per product id", () => {
  const a = freeDownloadCookieName("free-ats-resume-template-freshers-2026");
  const b = freeDownloadCookieName("free-job-application-tracker");
  assert.ok(a);
  assert.ok(b);
  assert.notEqual(a, b);
});
