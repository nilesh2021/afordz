export const posts = [
  {
    slug: "bootstrap-5-tailwind-html-templates-bundle",
    title: "500 Bootstrap 5 + 500 Tailwind CSS HTML Templates: What’s Inside",
    description:
      "What the Afordz bundle of 500 Bootstrap 5 HTML pages and 500 Tailwind CSS HTML pages actually contains, how the two stacks differ, and what to check before you customise a file.",
    published: "2026-10-07",
    image: {
      src: "/home/templates.jpg",
      alt: "A desk with a laptop open on a website layout, used as the article image for the HTML template bundle",
      width: 960,
      height: 540,
    },
    productSlug: "bootstrap-templates-bundle",
  },
  {
    slug: "canva-subscription",
    title: "What Canva is useful for",
    description:
      "How Canva helps with social posts, presentations, posters, and simple layouts in the browser, and what the Afordz one-year listing does and does not confirm.",
    published: "2026-10-09",
    image: {
      src: "/home/workspace.jpg",
      alt: "A laptop on a desk, used as the article image. It is not a Canva screenshot.",
      width: 960,
      height: 540,
    },
    productSlug: "canva-subscription",
    articleSection: "Design Tools",
  },
  {
    slug: "forbidden-keto-code-guide",
    title: "Forbidden Keto Code: What This Keto Fat Loss Guide Covers",
    description:
      "What the Forbidden Keto Code partner guide describes for keto food lists, staying in ketosis, and PDF, PNG, and video formats—and what Afordz does not verify.",
    published: "2026-10-09",
    image: {
      src: "/previews/forbidden-keto-code.webp",
      alt: "Cover image for the Forbidden Keto Code partner keto fat loss guide",
      width: 960,
      height: 540,
    },
    productSlug: "forbidden-keto-code",
    articleSection: "Ebooks",
  },
  {
    slug: "busy-moms-make-money-online-guide",
    title: "10 Ways Busy Moms Can Make Money Online (PDF Guide)",
    description:
      "A plain-language look at the Digistore PDF roadmap of ways busy moms can make money online from home, including delivery and realistic expectations.",
    published: "2026-10-09",
    image: {
      src: "/previews/busy-moms-make-money-online.png",
      alt: "Cover image for the busy moms make money online PDF guide",
      width: 960,
      height: 540,
    },
    productSlug: "busy-moms-make-money-online",
    articleSection: "Ebooks",
  },
  {
    slug: "start-affiliate-marketing-beginner-ebook",
    title: "Start Affiliate Marketing Like a Pro: Beginner Ebook Notes",
    description:
      "What a beginner affiliate marketing ebook covering funnels, traffic, and email sequences is for, and how the Afordz partner listing works.",
    published: "2026-10-09",
    image: {
      src: "/home/browse.jpg",
      alt: "Desk workspace used as the article image for the affiliate marketing beginner ebook",
      width: 960,
      height: 540,
    },
    productSlug: "start-affiliate-marketing",
    articleSection: "Ebooks",
  },
  {
    slug: "power-of-positive-thinking-ebook",
    title: "The Power of Positive Thinking: What’s in This PDF Ebook",
    description:
      "Vendor-described chapters in The Power of Positive Thinking PDF: attitude, creative thinking, and problem solving, plus how the Digistore partner listing works.",
    published: "2026-10-09",
    image: {
      src: "/previews/power-of-positive-thinking.webp",
      alt: "3D ebook mockup cover for The Power of Positive Thinking PDF",
      width: 960,
      height: 540,
    },
    productSlug: "power-of-positive-thinking",
    articleSection: "Ebooks",
  },
  {
    slug: "freelancer-productivity-action-kit-guide",
    title: "Freelancer Productivity Action Kit: Planners and Templates",
    description:
      "How the Freelancer Productivity Action Kit’s weekly planners, project templates, and social ideas are described, in PDF and PNG formats for solo freelancers.",
    published: "2026-10-09",
    image: {
      src: "/previews/freelancer-productivity-action-kit.webp",
      alt: "Cover for the Freelancer Productivity Action Kit partner download",
      width: 960,
      height: 540,
    },
    productSlug: "freelancer-productivity-action-kit",
    articleSection: "Ebooks",
  },
  {
    slug: "tshirt-typography-printing-designs-guide",
    title: "250+ T-Shirt Typography Designs for Print-on-Demand",
    description:
      "What the 250+ t-shirt typography EPS design bundle offers for print-on-demand sellers, including editing, commercial-use caveats, and Digistore checkout.",
    published: "2026-10-09",
    image: {
      src: "/previews/tshirt-typography-printing-designs.webp",
      alt: "Cover for the T-shirt Typography Printing Designs vector bundle",
      width: 960,
      height: 540,
    },
    productSlug: "tshirt-typography-printing-designs",
    articleSection: "Ebooks",
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostByProductSlug(productSlug) {
  return posts.find((post) => post.productSlug === productSlug) ?? null;
}
