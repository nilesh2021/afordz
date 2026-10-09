export const site = {
  name: "Afordz",
  tagline: "Smart Finds. Great Value.",
  email: "hello@afordz.in",
  emailNote: "Placeholder address. Replace it with a mailbox you control.",
  phoneNote: "Placeholder number. Replace it with a phone you answer.",
};

/** Absolute origin from NEXT_PUBLIC_SITE_URL, or null when it is unset or invalid. */
export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!value) {
    return null;
  }
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.origin;
    }
  } catch {
    return null;
  }
  return null;
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
