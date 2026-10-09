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
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostByProductSlug(productSlug) {
  return posts.find((post) => post.productSlug === productSlug) ?? null;
}
