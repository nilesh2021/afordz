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

export default function ProductCard({ product }) {
  const preview = product.images?.[0];
  const summary = product.tagline || product.description;
  const affiliate = isAffiliateProduct(product);
  const comingSoon = isComingSoon(product);
  const free = isFreeProduct(product);
  const priceIsPlaceholder = !affiliate && fieldIsPlaceholder(product, "price");
  const title = productTitle(product);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/90 shadow-[0_12px_28px_rgb(22_20_16/0.07)] sm:flex-row sm:rounded-3xl">
      <div className="shrink-0 overflow-hidden rounded-t-2xl bg-linear-to-br from-[#f3eef8] via-surface to-[#e4dcf0] p-1.5 sm:w-44 sm:rounded-l-3xl sm:rounded-tr-none sm:p-2 lg:w-48">
        {preview?.src || preview?.variant ? (
          <TemplateMockup
            variant={preview.variant}
            src={preview.src}
            alt={preview.alt}
            sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 100vw"
            className="rounded-xl"
          />
        ) : preview ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
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
              <p className="w-fit rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                {product.category}
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
                "Free"
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
        <div className={`grid gap-2 sm:max-w-sm ${affiliate || free ? "" : "sm:grid-cols-2"}`}>
          <Button
            href={`/products/${product.slug}`}
            variant={free ? "primary" : "secondary"}
            className="min-h-10 w-full px-4 py-2 text-sm"
          >
            {free ? product.freeCtaLabel ?? "Get free download" : "View Details"}
          </Button>
          {affiliate || comingSoon || free ? null : (
            <AddToCartButton product={product} className="min-h-10 px-4 py-2 text-sm" />
          )}
        </div>
      </div>
    </article>
  );
}
