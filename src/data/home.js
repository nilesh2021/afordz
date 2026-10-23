import { getProductById } from "@/data/products";

export const HOME_FREE_PRODUCT_IDS = [
  "free-ats-resume-template-freshers-2026",
  "free-chatgpt-prompts-job-seekers-2026",
  "free-job-application-tracker",
];

export const HOME_FREE_UI_UX_COURSE = {
  href: "/courses/ui-ux",
  title: "UI/UX Fundamentals",
  tagline: "Free on-site course with lessons, exercises, and a small case study.",
  category: "Training",
  ctaLabel: "Start course",
  image: {
    src: "/training/ux-design-thinking-loop.jpg",
    alt: "Design thinking loop diagram used in the UI/UX training track",
  },
};

export const HOME_ABOUT = {
  title: "About Afordz",
  paragraphs: [
    "Afordz is built by a small team of UI/UX designers and web developers who believe good career and design resources shouldn't cost a fortune.",
    "We make free resume templates, job-search tools, a free UI/UX course and affordable website templates, all designed to help students and freshers get hired or build faster.",
  ],
  promise: "Free means free. No spam, ever.",
  cta: { href: "/courses/ui-ux", label: "Start the free UI/UX course →" },
};

export const HOME_TRUST_SIGNALS = [
  { title: "4 free resources", body: "Three career downloads plus a free UI/UX course on this site." },
  { title: "Prices in INR", body: "Paid templates and courses stay affordable for students and freshers." },
  { title: "Simple checkout", body: "Free packs unlock with email. Paid items use Razorpay." },
  { title: "We reply", body: "Questions go to hello@afordz.in." },
];

export function getHomeFreeProducts() {
  return HOME_FREE_PRODUCT_IDS.map((id) => getProductById(id)).filter(Boolean);
}
