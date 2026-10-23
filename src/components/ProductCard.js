import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import Button from "@/components/Button";
import PlaceholderLabel from "@/components/PlaceholderLabel";
import TemplateMockup from "@/components/TemplateMockup";
import {
  fieldIsPlaceholder,
  formatInr,
  hasVerifiedPrice,
  isAffiliateProduct,
  isComingSoon,
  isFreeProduct,
  productTitle,
} from "@/data/products";

const CATEGORY_THEMES = {
  "Website Templates": {
    banner: "from-violet-200/65 via-surface to-indigo-100/65",
    badge: "border-violet-300 bg-violet-50 text-violet-900",
    hover: "hover:border-accent-strong/60",
  },
  "Career & Job Search": {
    banner: "from-emerald-100/80 via-surface to-teal-100/65",
    badge: "border-emerald-300 bg-emerald-50 text-emerald-900",
    hover: "hover:border-emerald-500/60",
  },
  "Language & Communication": {
    banner: "from-sky-100/80 via-surface to-indigo-100/60",
    badge: "border-sky-300 bg-sky-50 text-sky-900",
    hover: "hover:border-sky-500/60",
  },
  "Design Tools": {
    banner: "from-fuchsia-100/75 via-surface to-violet-100/65",
    badge: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900",
    hover: "hover:border-fuchsia-500/60",
  },
  Training: {
    banner: "from-indigo-100/80 via-surface to-violet-100/65",
    badge: "border-indigo-300 bg-indigo-50 text-indigo-900",
    hover: "hover:border-indigo-500/60",
  },
  Ebooks: {
    banner: "from-amber-100/75 via-surface to-orange-100/55",
    badge: "border-amber-300 bg-amber-50 text-amber-900",
    hover: "hover:border-amber-500/60",
  },
};

function getTheme(category, free) {
  if (free && !CATEGORY_THEMES[category]) {
    return CATEGORY_THEMES["Career & Job Search"];
  }
  return (
    CATEGORY_THEMES[category] ?? {
      banner: "from-violet-200/60 via-surface to-fuchsia-100/55",
      badge: "border-accent/40 bg-accent/15 text-ink",
      hover: "hover:border-accent-strong/60",
    }
  );
}

export default function ProductCard({ product }) {
  const preview = product.images?.[0];
  const summary = product.tagline || product.description;
  const affiliate = isAffiliateProduct(product);
  const comingSoon = isComingSoon(product);
  const free = isFreeProduct(product);
  const priceIsPlaceholder = !affiliate && fieldIsPlaceholder(product, "price");
  const title = productTitle(product);
  const theme = getTheme(product.category, free);

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-accent/40 bg-surface/95 shadow-[0_12px_28px_rgb(22_20_16/0.07)] transition duration-200 hover:shadow-[0_16px_36px_rgb(109_40_217/0.11)] sm:flex-row sm:rounded-3xl ${theme.hover}`}
    >
      <div
        className={`shrink-0 overflow-hidden rounded-t-2xl border-b border-border/60 bg-gradient-to-br ${theme.banner} p-2 sm:w-44 sm:rounded-l-3xl sm:rounded-tr-none sm:border-b-0 sm:border-r sm:p-2.5 lg:w-48`}
      >
        {preview?.src || preview?.variant ? (
          <TemplateMockup
            variant={preview.variant}
            src={preview.src}
            alt={preview.alt}
            sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 100vw"
            className="rounded-xl"
            colorful
          />
        ) : preview ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-accent/30 bg-surface shadow-xs">
            <Image
              src="/home/browse.jpg"
              alt="A tablet showing a grid of website template thumbnails"
              fill
              sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] rounded-xl border border-dashed border-accent/50 bg-surface" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-3 sm:px-4 sm:py-3.5">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {product.category ? (
              <p
                className={`w-fit rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.badge}`}
              >
                {product.category}
              </p>
            ) : null}
            {free ? (
              <p className="w-fit rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-900">
                Free
              </p>
            ) : null}
            {affiliate ? (
              <p className="w-fit rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                Partner offer
              </p>
            ) : null}
            {comingSoon ? (
              <p className="w-fit rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-950">
                Coming soon
              </p>
            ) : null}
          </div>

          <h3 className="mt-1.5 font-display text-xl leading-snug tracking-tight text-ink sm:mt-2 sm:text-[1.35rem]">
            <Link href={`/products/${product.slug}`} className="hover:text-accent-strong">
              {title}
            </Link>
          </h3>

          <p className="mt-1.5 line-clamp-2 max-w-xl text-sm leading-5 text-muted">{summary}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="font-display text-lg tracking-tight text-ink sm:text-xl">
              <span className="sr-only">Price: </span>
              {affiliate || !hasVerifiedPrice(product) ? (
                "Check current price"
              ) : free ? (
                <span className="text-emerald-800">Free</span>
              ) : (
                <>
                  {formatInr(product.priceInr)}
                  {product.subscriptionTerm ? (
                    <span className="ml-2 text-base font-medium tracking-normal text-muted">
                      for {product.subscriptionTerm}
                    </span>
                  ) : null}
                </>
              )}
            </p>
            {priceIsPlaceholder ? <PlaceholderLabel /> : null}
          </div>
        </div>

        <div
          className={`grid gap-2 sm:max-w-sm ${
            comingSoon || (!affiliate && !free) ? "sm:grid-cols-2" : ""
          }`}
        >
          {comingSoon ? (
            <>
              <Button
                href={`/products/${product.slug}#waitlist`}
                variant="primary"
                className="min-h-10 w-full px-4 py-2 text-sm"
              >
                Join waitlist
              </Button>
              <Button
                href={`/products/${product.slug}`}
                variant="secondary"
                className="min-h-10 w-full px-4 py-2 text-sm"
              >
                View details
              </Button>
            </>
          ) : (
            <>
              <Button
                href={`/products/${product.slug}`}
                variant={free ? "primary" : "secondary"}
                className="min-h-10 w-full px-4 py-2 text-sm"
              >
                {free ? product.freeCtaLabel ?? "Get free download" : "View Details"}
              </Button>
              {affiliate || free ? null : (
                <AddToCartButton product={product} className="min-h-10 px-4 py-2 text-sm" />
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
