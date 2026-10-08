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
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}
