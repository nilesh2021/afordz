/**
 * Catalogue query, filtering, and sorting.
 *
 * Filters combine with AND across groups. Within category, format, or tool,
 * any selected value can match. Search checks the product name, title,
 * tagline, description, topics, and vendor. Sort defaults to newest.
 *
 * Price range applies only to products with a verified numeric price.
 * Partner offers without a price are not treated as 0 and are not dropped
 * by a min or max filter.
 *
 * Purchase type defaults to Afordz Products (`own`). Use `all` or `partner`
 * in the URL to override.
 */

import { hasVerifiedPrice, isAffiliateProduct } from "@/data/products";

export const DEFAULT_SORT = "newest";
export const DEFAULT_PURCHASE = "own";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest", shortLabel: "Newest" },
  { value: "price-asc", label: "Price: low to high", shortLabel: "Low to high" },
  { value: "price-desc", label: "Price: high to low", shortLabel: "High to low" },
];

export const PURCHASE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "own", label: "Afordz Products" },
  { value: "partner", label: "Partner Offers" },
];

const SORT_VALUES = new Set(SORT_OPTIONS.map((option) => option.value));
const PURCHASE_VALUES = new Set(PURCHASE_OPTIONS.map((option) => option.value));

function uniqueInOrder(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!value || seen.has(value)) {
      continue;
    }
    seen.add(value);
    result.push(value);
  }
  return result;
}

export function getFilterOptions(products) {
  const prices = products.map((product) => product.priceInr).filter((price) => Number.isFinite(price));

  return {
    categories: uniqueInOrder(products.map((product) => product.category)),
    formats: uniqueInOrder(products.map((product) => product.format)),
    frameworks: uniqueInOrder(products.map((product) => product.framework)),
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
  };
}

function asList(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string");
  }
  if (typeof value === "string" && value) {
    return [value];
  }
  return [];
}

export function normalizePriceParam(value) {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return "";
  }
  return String(Number(trimmed));
}

export function parseCatalogueQuery(params = {}) {
  const sortValue = typeof params.sort === "string" ? params.sort : "";
  const purchaseValue = typeof params.purchase === "string" ? params.purchase : "";
  return {
    q: typeof params.search === "string" ? params.search : "",
    purchase: PURCHASE_VALUES.has(purchaseValue) ? purchaseValue : DEFAULT_PURCHASE,
    categories: asList(params.category).map((item) => item.trim()).filter(Boolean),
    formats: asList(params.format).map((item) => item.trim()).filter(Boolean),
    frameworks: asList(params.framework).map((item) => item.trim()).filter(Boolean),
    min: normalizePriceParam(params.min),
    max: normalizePriceParam(params.max),
    sort: SORT_VALUES.has(sortValue) ? sortValue : DEFAULT_SORT,
  };
}

export function serializeCatalogueQuery(query) {
  const params = new URLSearchParams();
  const search = query.q.trim();
  if (search) {
    params.set("search", search);
  }
  if (query.purchase && query.purchase !== DEFAULT_PURCHASE) {
    params.set("purchase", query.purchase);
  }
  for (const category of query.categories) {
    params.append("category", category);
  }
  for (const format of query.formats ?? []) {
    params.append("format", format);
  }
  for (const framework of query.frameworks) {
    params.append("framework", framework);
  }
  if (query.min !== "") {
    params.set("min", query.min);
  }
  if (query.max !== "") {
    params.set("max", query.max);
  }
  if (query.sort && query.sort !== DEFAULT_SORT) {
    params.set("sort", query.sort);
  }
  return params;
}

export function emptyFilters(query) {
  return {
    ...query,
    purchase: DEFAULT_PURCHASE,
    categories: [],
    formats: [],
    frameworks: [],
    min: "",
    max: "",
  };
}

export function resetCatalogueQuery(query) {
  return {
    ...emptyFilters(query),
    q: "",
  };
}

function priceBound(value) {
  if (value === "") {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function isPriceRangeInvalid(query) {
  const min = priceBound(query.min);
  const max = priceBound(query.max);
  return min != null && max != null && min > max;
}

function isNonDefaultPurchase(purchase) {
  return Boolean(purchase) && purchase !== DEFAULT_PURCHASE;
}

export function hasActiveFilters(query) {
  return (
    isNonDefaultPurchase(query.purchase) ||
    query.categories.length > 0 ||
    (query.formats ?? []).length > 0 ||
    query.frameworks.length > 0 ||
    query.min !== "" ||
    query.max !== ""
  );
}

export function countActiveFilters(query) {
  return (
    (isNonDefaultPurchase(query.purchase) ? 1 : 0) +
    query.categories.length +
    (query.formats ?? []).length +
    query.frameworks.length +
    (query.min !== "" ? 1 : 0) +
    (query.max !== "" ? 1 : 0)
  );
}

function matchesSearch(product, needle) {
  if (!needle) {
    return true;
  }
  const haystack = [
    product.name,
    product.title,
    product.tagline,
    product.description,
    product.vendor,
    ...(product.topics ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function matchesPurchase(product, purchase) {
  if (!purchase || purchase === "all") {
    return true;
  }
  if (purchase === "own") {
    return !isAffiliateProduct(product);
  }
  if (purchase === "partner") {
    return isAffiliateProduct(product);
  }
  return true;
}

export function filterProducts(products, query) {
  if (isPriceRangeInvalid(query)) {
    return [];
  }

  const needle = query.q.trim().toLowerCase();
  const min = priceBound(query.min);
  const max = priceBound(query.max);
  const formats = query.formats ?? [];

  return products.filter((product) => {
    if (!matchesSearch(product, needle)) {
      return false;
    }
    if (!matchesPurchase(product, query.purchase)) {
      return false;
    }
    if (query.categories.length > 0 && !query.categories.includes(product.category)) {
      return false;
    }
    if (formats.length > 0 && !formats.includes(product.format)) {
      return false;
    }
    if (query.frameworks.length > 0 && !query.frameworks.includes(product.framework)) {
      return false;
    }
    if ((min != null || max != null) && !hasVerifiedPrice(product)) {
      return true;
    }
    if (min != null && product.priceInr < min) {
      return false;
    }
    if (max != null && product.priceInr > max) {
      return false;
    }
    return true;
  });
}

export function sortProducts(products, sort) {
  const next = [...products];
  next.sort((left, right) => {
    if (sort === "price-asc" || sort === "price-desc") {
      const leftPriced = hasVerifiedPrice(left);
      const rightPriced = hasVerifiedPrice(right);
      if (leftPriced !== rightPriced) {
        return leftPriced ? -1 : 1;
      }
      if (leftPriced && rightPriced) {
        const difference = left.priceInr - right.priceInr;
        if (difference !== 0) {
          return sort === "price-asc" ? difference : -difference;
        }
      }
    } else {
      const difference = String(right.addedAt ?? "").localeCompare(String(left.addedAt ?? ""));
      if (difference !== 0) {
        return difference;
      }
    }
    return (left.name || "").localeCompare(right.name || "");
  });
  return next;
}

export function purchaseLabel(value) {
  return PURCHASE_OPTIONS.find((option) => option.value === value)?.label ?? "All";
}

export function productCountLabel(count) {
  return `${count} ${count === 1 ? "product" : "products"}`;
}
