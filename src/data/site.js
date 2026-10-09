export const site = {
  name: "Afordz",
  tagline: "Smart Finds. Great Value.",
  email: "hello@afordz.in",
  emailNote: "Published contact address. Confirm that this mailbox is monitored before treating it as a support SLA.",
};

export const PRODUCTION_ORIGIN = "https://www.afordz.in";

/** Dates used as sitemap lastmod for pages edited in this SEO pass. */
export const staticPageUpdatedAt = {
  "/": "2026-10-09",
  "/shop": "2026-10-09",
  "/blog": "2026-10-09",
  "/contact": "2026-10-09",
  "/privacy": "2026-10-09",
  "/terms": "2026-10-09",
  "/refund-policy": "2026-10-09",
};

const PRODUCTION_HOSTS = new Set(["afordz.in", "www.afordz.in"]);

/**
 * Absolute origin for canonicals, sitemap, Open Graph, and JSON-LD.
 * Production always uses https://www.afordz.in. Localhost and preview hosts are kept.
 */
export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!value) {
    return PRODUCTION_ORIGIN;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return PRODUCTION_ORIGIN;
    }
    if (PRODUCTION_HOSTS.has(url.hostname.toLowerCase())) {
      return PRODUCTION_ORIGIN;
    }
    return url.origin;
  } catch {
    return PRODUCTION_ORIGIN;
  }
}

const TRACKING_PARAM_NAMES = new Set(["gclid", "fbclid", "ref", "_ga", "mc_cid", "mc_eid"]);

function isTrackingParam(name) {
  const key = name.toLowerCase();
  return key.startsWith("utm_") || TRACKING_PARAM_NAMES.has(key);
}

/** Absolute URL for a site path. Tracking-only query keys are dropped. */
export function absoluteUrl(path = "/") {
  const origin = getSiteUrl();
  const url = new URL(path || "/", `${origin}/`);
  for (const key of [...url.searchParams.keys()]) {
    if (isTrackingParam(key)) {
      url.searchParams.delete(key);
    }
  }
  url.hash = "";
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  const search = url.searchParams.toString();
  return `${url.origin}${pathname}${search ? `?${search}` : ""}`;
}

/** Page-specific canonical: origin + path, with no query string. */
export function canonicalUrl(path = "/") {
  const origin = getSiteUrl();
  const url = new URL((path || "/").split("?")[0] || "/", `${origin}/`);
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${url.origin}${pathname}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export const homeFeatures = [
  {
    title: "Filter the shop",
    body: "Narrow the catalogue by purchase type, category, format, compatible tool, and a price range in INR. Sort sits above the product cards.",
  },
  {
    title: "Prices in INR",
    body: "Afordz product cards show the catalogue price in rupees. Checkout prices the order again on the server. Partner offers show Check current price instead of a fixed amount.",
  },
  {
    title: "One licence per order",
    body: "A product is a single digital licence. Adding it again leaves the cart as it is.",
  },
  {
    title: "Review the listing first",
    body: "View Details opens the product page, including any fields that are still marked as placeholders.",
  },
];

export const footerLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export const downloadSteps = [
  {
    title: "Choose a product",
    body: "Open a listing, then add it to the cart. Each product is one digital licence, and adding it again leaves the cart unchanged.",
  },
  {
    title: "Pay with Razorpay",
    body: "Checkout asks for a name and an email address. Card and UPI details are entered on Razorpay for the catalogue price in INR.",
  },
  {
    title: "Receive what the listing includes",
    body: "After the payment is captured, a file product gets a private download for 48 hours. A subscription is limited to the details confirmed on its listing and does not include a download file.",
  },
];

export const downloadNote =
  "A download is issued only after the server confirms a captured Razorpay payment. The paid archive stays out of the public folder, and the download expires.";

export const faqs = [
  {
    id: "what-you-buy",
    question: "What am I buying?",
    answer:
      "One digital licence for a product in the shop, or a partner offer fulfilled by the vendor. Open the listing to see what is included. Details marked as unconfirmed on a product page are not part of the offer.",
  },
  {
    id: "delivery",
    question: "How will I receive the files?",
    answer:
      "For a file product, a captured Razorpay payment for that order, amount, and INR opens a private download that expires in 48 hours. The templates listing is a ZIP of 1,000 standalone HTML pages. A subscription listing does not include a download file.",
  },
  {
    id: "cart-limit",
    question: "Can I add a product more than once?",
    answer:
      "No. Each order includes one digital licence per product. Adding that product again leaves the cart as it is.",
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer:
      "Checkout asks for your name and email. Card and UPI details are entered on Razorpay for the catalogue price in INR.",
  },
  {
    id: "refunds",
    question: "What is the refund policy?",
    answer:
      "The refund policy does not promise a refund, exchange, replacement, or credit.",
  },
  {
    id: "partner-offers",
    question: "What is a partner offer?",
    answer:
      "A partner offer is sold on the vendor website, not through the Afordz cart. Checkout, delivery, and support are handled by the vendor. Afordz may earn a commission if you purchase through a configured affiliate link. Partner listings do not include a local download.",
  },
  {
    id: "contact",
    question: "How do I ask a question?",
    answer: "Use the contact page and email hello@afordz.in. The listings do not include a support window.",
  },
];
