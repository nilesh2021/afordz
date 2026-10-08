import { posts } from "@/data/posts";
import { getVisibleProducts } from "@/data/products";
import { getSiteUrl } from "@/data/site";

export default function sitemap() {
  const siteUrl = getSiteUrl() ?? "http://localhost:3000";
  const staticPaths = ["", "/shop", "/blog", "/contact", "/privacy", "/terms", "/refund-policy"];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date("2026-10-07"),
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.published}T00:00:00Z`),
  }));

  const productEntries = getVisibleProducts().map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(`${product.addedAt}T00:00:00Z`),
  }));

  return [...staticEntries, ...postEntries, ...productEntries];
}
