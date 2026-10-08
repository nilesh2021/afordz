export const site = {
  name: "Afordz",
  tagline: "Smart Finds. Great Value.",
  email: "hello@afordz.example",
  phone: "+91 00000 00000",
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
    title: "Add one licence",
    body: "Add the bundle to the cart. The cart keeps a single digital licence and will not add a second copy.",
  },
  {
    title: "Pay in Razorpay test mode",
    body: "Checkout asks for a name and an email address. Card and UPI details are entered on Razorpay. Live keys are rejected.",
  },
  {
    title: "Download after a captured payment",
    body: "The server confirms the captured payment, order id, amount, and INR currency, then opens a private download that expires in 48 hours.",
  },
];

export const downloadNote =
  "A download is issued only after the server confirms a captured Razorpay test payment. The paid archive stays out of the public folder, and the download expires.";

export const faqs = [
  {
    id: "what-you-buy",
    question: "What am I buying?",
    answer:
      "One digital licence for an Afordz product in the shop, or a partner offer fulfilled by the vendor. Open the listing to see what is included. Counts, file lists, and other details on Afordz product pages are placeholders until they are confirmed.",
  },
  {
    id: "delivery",
    question: "How will I receive the files?",
    answer:
      "After Razorpay reports a captured test payment, the server checks the order id, amount, and INR currency. A matching order then gets a private download that expires in 48 hours. Live payments are not enabled.",
  },
  {
    id: "cart-limit",
    question: "Can I add the bundle more than once?",
    answer:
      "No. Each order includes one digital licence per product. Adding that product again leaves the cart as it is.",
  },
  {
    id: "payment",
    question: "Is checkout a live payment?",
    answer:
      "No. Checkout uses Razorpay test mode. Live keys are rejected, so a test payment does not charge a real card. A download is created only after the server confirms the payment was captured.",
  },
  {
    id: "refunds",
    question: "What is the refund position?",
    answer:
      "The refund page is an editable draft. It does not promise a refund. Replace it with terms that match how you will sell the files.",
  },
  {
    id: "partner-offers",
    question: "What is a partner offer?",
    answer:
      "A partner offer is sold on the vendor website, not through the Afordz cart. Checkout, delivery, and support are handled by the vendor. We may earn a commission if you purchase through a configured affiliate link. Partner listings do not include a local download.",
  },
  {
    id: "contact",
    question: "How do I ask a question?",
    answer:
      "Use the contact page. The email address and phone number there are placeholders until you replace them.",
  },
];
