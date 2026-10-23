import assert from "node:assert/strict";
import test from "node:test";
import { getAffiliateOutboundUrl } from "../src/data/products.js";

test("getAffiliateOutboundUrl upgrades http to https", () => {
  const url = getAffiliateOutboundUrl({
    affiliateUrl: "http://example.com/path#aff=test",
  });
  assert.equal(url, "https://example.com/path#aff=test");
});

test("getAffiliateOutboundUrl leaves https unchanged", () => {
  const input = "https://www.checkout-ds24.com/redir/630881/nlsweb27/";
  assert.equal(getAffiliateOutboundUrl({ affiliateUrl: input }), input);
});

test("getAffiliateOutboundUrl returns empty for missing or invalid url", () => {
  assert.equal(getAffiliateOutboundUrl({ affiliateUrl: "" }), "");
  assert.equal(getAffiliateOutboundUrl({ affiliateUrl: "not-a-url" }), "");
  assert.equal(getAffiliateOutboundUrl(null), "");
});
