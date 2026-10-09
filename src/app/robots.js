import { PRODUCTION_ORIGIN } from "@/data/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${PRODUCTION_ORIGIN}/sitemap.xml`,
  };
}
