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
  productTitle,
} from "@/data/products";

export default function ProductCard({ product }) {
  const preview = product.images?.[0];
  const summary = product.tagline || product.description;
  const affiliate = isAffiliateProduct(product);
  const comingSoon = isComingSoon(product);
  const priceIsPlaceholder = !affiliate && fieldIsPlaceholder(product, "price");
  const title = productTitle(product);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-surface/90 shadow-[0_18px_40px_rgb(22_20_16/0.08)] sm:flex-row sm:rounded-[2rem]">
      <div className="shrink-0 overflow-hidden rounded-t-3xl bg-linear-to-br from-[#f3eef8] via-surface to-[#e4dcf0] p-2 sm:w-64 sm:rounded-l-[2rem] sm:rounded-tr-none sm:p-4 lg:w-72">
        {preview?.src ? (
          <TemplateMockup
            variant={preview.variant}
            src={preview.src}
            alt={preview.alt}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 100vw"
          />
        ) : preview ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/home/browse.jpg"
              alt="A tablet showing a grid of website template thumbnails"
              fill
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] rounded-2xl border border-dashed border-accent/50 bg-surface" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:gap-5 sm:px-6 sm:py-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.category ? (
              <p className="w-fit rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                {product.category}
              </p>
            ) : null}
            {affiliate ? (
              <p className="w-fit rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Partner offer
              </p>
            ) : null}
            {comingSoon ? (
              <p className="w-fit rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-950">
                Coming soon
              </p>
            ) : null}
          </div>
          <h3 className="mt-2 font-display text-2xl leading-snug tracking-tight text-ink sm:mt-3 sm:text-[1.7rem]">
            <Link href={`/products/${product.slug}`} className="hover:text-accent-strong">
              {title}
            </Link>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
            <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">
              <span className="sr-only">Price: </span>
              {affiliate || !hasVerifiedPrice(product) ? (
                "Check current price"
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
        <div className={`grid gap-2.5 sm:max-w-md ${affiliate ? "" : "sm:grid-cols-2"}`}>
          <Button href={`/products/${product.slug}`} variant="secondary" className="w-full">
            View Details
          </Button>
          {affiliate || comingSoon ? null : <AddToCartButton product={product} />}
        </div>
      </div>
    </article>
  );
}
