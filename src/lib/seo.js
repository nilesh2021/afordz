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
  keywords,
  index = true,
  type = "website",
  publishedTime,
} = {}) {
  const canonical = canonicalUrl(path);
  const ogTitle = shareTitle(title);
  const ogImages = shareImageEntries(images);
  const keywordList = Array.isArray(keywords)
    ? keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
    : [];

  return {
    title,
    description,
    ...(keywordList.length ? { keywords: keywordList } : {}),
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

export function courseJsonLd(track) {
  const course = track.course;
  const origin = getSiteUrl();
  const url = canonicalUrl(`/courses/${track.slug}`);
  const keywordList = Array.isArray(course.keywords)
    ? course.keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
    : [];
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || course.tagline,
    url,
    isAccessibleForFree: true,
    inLanguage: "en",
    educationalLevel: course.level,
    ...(keywordList.length ? { keywords: keywordList.join(", ") } : {}),
    provider: {
      "@id": `${origin}/#organization`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.duration,
    },
    offers: {
      "@type": "Offer",
      url,
      price: 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      category: "Free",
    },
    hasPart: (course.modules ?? []).map((module) => ({
      "@type": "LearningResource",
      name: module.title,
      description: module.summary,
      timeRequired: module.duration,
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
  const keywords = [
    ...(Array.isArray(product.keywords) ? product.keywords : []),
    ...(Array.isArray(product.topics) ? product.topics : []),
  ]
    .map((keyword) => String(keyword).trim())
    .filter(Boolean);
  if (keywords.length) {
    data.keywords = [...new Set(keywords)].join(", ");
  }

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
