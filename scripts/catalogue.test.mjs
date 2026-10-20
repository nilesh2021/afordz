import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_TIER,
  filterProducts,
  parseCatalogueQuery,
  serializeCatalogueQuery,
} from "../src/data/catalogue.js";
import {
  getVisibleProducts,
  isFreeProduct,
  isPremiumCatalogueProduct,
} from "../src/data/products.js";

const FREE_IDS = new Set([
  "500-tongue-twisters-english-pronunciation",
  "free-ats-resume-template-freshers-2026",
  "free-job-application-tracker",
  "free-chatgpt-prompts-job-seekers-2026",
]);

function baseQuery(overrides = {}) {
  return {
    q: "",
    purchase: "own",
    tier: DEFAULT_TIER,
    categories: [],
    min: "",
    max: "",
    sort: "newest",
    ...overrides,
  };
}

test("isPremiumCatalogueProduct is inverse of isFreeProduct for visible listings", () => {
  for (const product of getVisibleProducts()) {
    assert.equal(isPremiumCatalogueProduct(product), !isFreeProduct(product));
  }
});

test("tier=free returns only live direct listings with priceInr 0", () => {
  const results = filterProducts(getVisibleProducts(), baseQuery({ tier: "free" }));
  assert.ok(results.length >= 4);
  for (const product of results) {
    assert.equal(isFreeProduct(product), true);
    assert.equal(product.priceInr, 0);
    assert.ok(FREE_IDS.has(product.id));
  }
  for (const id of FREE_IDS) {
    assert.ok(results.some((product) => product.id === id));
  }
});

test("tier=premium excludes free career and pronunciation packs", () => {
  const results = filterProducts(
    getVisibleProducts(),
    baseQuery({ tier: "premium", purchase: "all" }),
  );
  for (const id of FREE_IDS) {
    assert.equal(results.some((product) => product.id === id), false);
  }
  assert.ok(results.some((product) => product.id === "marketing-contact-email-list"));
  assert.ok(results.some((product) => product.id === "forbidden-keto-code"));
});

test("tier serializes and parses in catalogue query helpers", () => {
  const parsed = parseCatalogueQuery({ tier: "premium" });
  assert.equal(parsed.tier, "premium");
  const params = serializeCatalogueQuery({ ...baseQuery(), tier: "free" });
  assert.equal(params.get("tier"), "free");
  const roundTrip = parseCatalogueQuery({ tier: params.get("tier") });
  assert.equal(roundTrip.tier, "free");
  assert.equal(parseCatalogueQuery({ tier: "invalid" }).tier, DEFAULT_TIER);
});
