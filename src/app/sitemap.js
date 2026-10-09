import { posts } from "@/data/posts";
import { getIndexableProducts } from "@/data/products";
import { canonicalUrl, getSiteUrl, staticPageUpdatedAt } from "@/data/site";

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const staticPaths = ["/", "/shop", "/blog", "/contact", "/privacy", "/terms", "/refund-policy"];

  const staticEntries = staticPaths.map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date(`${staticPageUpdatedAt[path]}T00:00:00Z`),
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.published}T00:00:00Z`),
  }));

  const productEntries = getIndexableProducts().map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(`${product.addedAt}T00:00:00Z`),
  }));

  return [...staticEntries, ...postEntries, ...productEntries];
}
