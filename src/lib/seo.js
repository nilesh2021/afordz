import { absoluteUrl, canonicalUrl, getSiteUrl, site } from "@/data/site";
import { isIndexableProduct, productTitle } from "@/data/products";

export { absoluteUrl, canonicalUrl, getSiteUrl, PRODUCTION_ORIGIN } from "@/data/site";

export const DEFAULT_SHARE_IMAGE = {
  src: "/home/templates.jpg",
  alt: "Printed website layout cards stacked on a desk",
  width: 1024,
  height: 768,
};

function shareTitle(title) {
  if (typeof title === "string") {
    return title;
  }
  if (title && typeof title === "object" && typeof title.absolute === "string") {
    return title.absolute;
  }
  return site.name;
}

function shareImageEntries(images) {
  const list = images?.length ? images : [DEFAULT_SHARE_IMAGE];
  return list
    .filter((image) => image?.src)
    .map((image) => ({
      url: image.src.startsWith("http") ? image.src : absoluteUrl(image.src),
      alt: image.alt || "",
      width: image.width,
      height: image.height,
    }));
}

/**
 * Page-specific Metadata API fields. Canonical is never the homepage unless path is "/".
 * Do not call this from the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
  index = true,
  type = "website",
  publishedTime,
} = {}) {
  const canonical = canonicalUrl(path);
  const ogTitle = shareTitle(title);
  const ogImages = shareImageEntries(images);

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: Boolean(index),
      follow: true,
    },
    openGraph: {
      type,
      title: ogTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_IN",
      ...(publishedTime ? { publishedTime } : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}

export function organizationJsonLd() {
  const origin = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: site.name,
        url: origin,
        email: site.email,
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: site.name,
        url: origin,
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function productJsonLd(product) {
  const url = canonicalUrl(`/products/${product.slug}`);
  const images = (product.images ?? [])
    .filter((image) => image.src)
    .map((image) => absoluteUrl(image.src));
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productTitle(product),
    description: product.description || product.tagline,
    url,
    image: images,
  };

  if (isIndexableProduct(product) && Number.isFinite(product.priceInr)) {
    data.offers = {
      "@type": "Offer",
      url,
      priceCurrency: product.currency || "INR",
      price: product.priceInr,
      availability: "https://schema.org/InStock",
    };
  }

  return data;
}

export function productShareImage(product) {
  const preview = (product.images ?? []).find((image) => image.src);
  if (!preview) {
    return DEFAULT_SHARE_IMAGE;
  }
  return {
    src: preview.src,
    alt: preview.alt,
    width: 960,
    height: 600,
  };
}
