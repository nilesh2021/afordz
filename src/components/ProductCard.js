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
  productTitle,
} from "@/data/products";

export default function ProductCard({ product }) {
  const preview = product.images?.[0];
  const summary = product.tagline || product.description;
  const affiliate = isAffiliateProduct(product);
  const priceIsPlaceholder = !affiliate && fieldIsPlaceholder(product, "price");
  const title = productTitle(product);

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_18px_40px_rgb(20_18_28/0.08)] sm:flex-row">
      <div className="shrink-0 overflow-hidden rounded-t-[2rem] bg-linear-to-br from-violet-50 via-white to-emerald-50 p-3 sm:w-64 sm:rounded-l-[2rem] sm:rounded-tr-none sm:p-4 lg:w-72">
        {preview?.src ? (
          <TemplateMockup
            variant={preview.variant}
            src={preview.src}
            alt={preview.alt}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 100vw"
          />
        ) : preview ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200">
            <Image
              src="/home/browse.jpg"
              alt="A tablet showing a grid of website template thumbnails"
              fill
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] rounded-2xl border border-dashed border-indigo-200 bg-white" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:px-6 sm:py-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.category ? (
              <p className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-800">
                {product.category}
              </p>
            ) : null}
            {affiliate ? (
              <p className="w-fit rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-900">
                Partner offer
              </p>
            ) : null}
          </div>
          <h3 className="mt-3 font-display text-[1.7rem] leading-snug tracking-tight text-zinc-950">
            <Link href={`/products/${product.slug}`} className="hover:text-indigo-800">
              {title}
            </Link>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">{summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="font-display text-2xl tracking-tight text-zinc-950">
              <span className="sr-only">Price: </span>
              {affiliate || !hasVerifiedPrice(product) ? (
                "Check current price"
              ) : (
                <>
                  {formatInr(product.priceInr)}
                  {product.subscriptionTerm ? (
                    <span className="ml-2 text-base font-medium tracking-normal text-zinc-600">
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
          {affiliate ? null : <AddToCartButton product={product} />}
        </div>
      </div>
    </article>
  );
}
