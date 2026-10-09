import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartControls from "@/components/AddToCartControls";
import AffiliateOfferCta from "@/components/AffiliateOfferCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PlaceholderLabel from "@/components/PlaceholderLabel";
import PreviewGallery from "@/components/PreviewGallery";
import PriceTag from "@/components/PriceTag";
import { getPostByProductSlug } from "@/data/posts";
import {
  fieldIsPlaceholder,
  getVisibleProductBySlug,
  getVisibleProducts,
  hasPlaceholders,
  isAffiliateProduct,
  isComingSoon,
  isDraftProduct,
  isIndexableProduct,
  productTitle,
} from "@/data/products";
import { breadcrumbJsonLd, pageMetadata, productJsonLd, productShareImage } from "@/lib/seo";

export function generateStaticParams() {
  return getVisibleProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getVisibleProductBySlug(slug);
  if (!product) {
    return { title: "Product" };
  }
  const title = productTitle(product);
  return pageMetadata({
    title,
    description: product.tagline,
    path: `/products/${product.slug}`,
    images: [productShareImage(product)],
    index: isIndexableProduct(product),
  });
}

function productBreadcrumbs(product) {
  return [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: productTitle(product), path: `/products/${product.slug}` },
  ];
}

function Spec({ title, placeholder, children }) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {placeholder ? <PlaceholderLabel /> : null}
      </div>
      <div className="mt-4 space-y-3 text-sm leading-6 text-muted">{children}</div>
    </section>
  );
}

function DirectProductPage({ product }) {
  const contents = Array.isArray(product.contents) ? product.contents : [];
  const compatibility = Array.isArray(product.compatibility) ? product.compatibility : [];
  const licencePoints = Array.isArray(product.licence?.points) ? product.licence.points : [];
  const supportPoints = Array.isArray(product.support?.points) ? product.support.points : [];
  const guide = getPostByProductSlug(product.slug);
  const crumbs = productBreadcrumbs(product);
  const hasSpecs =
    contents.length > 0 ||
    Boolean(product.subscriptionTerm) ||
    Boolean(product.bootstrapVersion) ||
    Boolean(product.fileFormat) ||
    compatibility.length > 0 ||
    Boolean(product.licence) ||
    Boolean(product.support);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {isIndexableProduct(product) ? <JsonLd data={productJsonLd(product)} /> : null}
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <p className="mt-4 text-sm font-semibold text-accent-strong">
        {product.category || "Digital product"}
      </p>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <PreviewGallery images={product.images} note={product.previewNote} />

        <div>
          <h1 className="font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl">
            {productTitle(product)}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{product.description}</p>
          <div className="mt-6">
            <PriceTag
              amount={product.priceInr}
              placeholder={fieldIsPlaceholder(product, "price")}
              size="lg"
              term={product.subscriptionTerm}
            />
          </div>
          {hasPlaceholders(product) ? (
            <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              {product.placeholderNote}
            </p>
          ) : null}
          {isComingSoon(product) ? (
            <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
              Coming soon. This listing is not available to purchase yet.
            </p>
          ) : (
            <AddToCartControls product={product} />
          )}
          {guide ? (
            <p className="mt-6 text-sm leading-6 text-muted">
              Read the{" "}
              <Link href={`/blog/${guide.slug}`} className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                {guide.title}
              </Link>{" "}
              guide for what this listing includes.
            </p>
          ) : null}
        </div>
      </div>

      {hasSpecs ? (
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {contents.length > 0 ? (
            <Spec
              title={product.subscriptionTerm ? "What's included" : "Included files"}
              placeholder={fieldIsPlaceholder(product, "contents")}
            >
              <ul className="space-y-4">
                {contents.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Spec>
          ) : null}

          {product.subscriptionTerm ? (
            <Spec title="Subscription term" placeholder={fieldIsPlaceholder(product, "plan")}>
              <p className="text-2xl font-semibold text-ink">{product.subscriptionTerm}</p>
              <p>Listed catalogue term. Confirm when the year starts after a verified payment.</p>
            </Spec>
          ) : null}

          {product.bootstrapVersion ? (
            <Spec
              title="Bootstrap version"
              placeholder={fieldIsPlaceholder(product, "bootstrapVersion")}
            >
              <p className="text-2xl font-semibold text-ink">Bootstrap {product.bootstrapVersion}</p>
              <p>{product.bootstrapVersionNote}</p>
              {fieldIsPlaceholder(product, "templateCount") ? (
                <p>
                  The name of this product mentions 1000 templates. That count is still a placeholder.
                </p>
              ) : null}
            </Spec>
          ) : null}

          {product.fileFormat ? (
            <Spec title="File format" placeholder={fieldIsPlaceholder(product, "fileFormat")}>
              <p className="text-2xl font-semibold text-ink">{product.fileFormat}</p>
              <p>{product.fileFormatNote}</p>
              {fieldIsPlaceholder(product, "recordCount") ? (
                <p>The number of contact records is still a placeholder.</p>
              ) : null}
            </Spec>
          ) : null}

          {compatibility.length > 0 ? (
            <Spec title="Compatibility" placeholder={fieldIsPlaceholder(product, "compatibility")}>
              <ul className="list-disc space-y-2 pl-5">
                {compatibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Spec>
          ) : null}

          {product.licence ? (
            <Spec title="Usage licence" placeholder={fieldIsPlaceholder(product, "licence")}>
              <p>{product.licence.summary}</p>
              {licencePoints.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5">
                  {licencePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </Spec>
          ) : null}

          {product.support ? (
            <Spec title="Support" placeholder={fieldIsPlaceholder(product, "support")}>
              <p>{product.support.summary}</p>
              {supportPoints.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5">
                  {supportPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </Spec>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AffiliateProductPage({ product }) {
  const topics = product.topics ?? [];
  const crumbs = productBreadcrumbs(product);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-accent-strong">
          {product.category || "Partner offer"}
        </p>
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Partner offer
        </span>
      </div>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <PreviewGallery images={product.images} note={product.previewNote} />

        <div>
          <h1 className="font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl">
            {productTitle(product)}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{product.description}</p>
          {isDraftProduct(product) ? (
            <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              Draft listing. It is available in local development for review and is excluded from
              the production catalogue until you set status to live and add a promo URL.
            </p>
          ) : null}
          <AffiliateOfferCta product={product} />
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Spec title="Overview">
          <p>{product.description}</p>
        </Spec>

        {topics.length > 0 ? (
          <Spec title="Topics">
            <ul className="list-disc space-y-2 pl-5">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </Spec>
        ) : null}

        {product.audience ? (
          <Spec title="Intended audience">
            <p>{product.audience}</p>
          </Spec>
        ) : null}

        <Spec title="Vendor information">
          <p>
            Vendor: {product.vendor}. Format: {product.format}. Language: {product.language}.
          </p>
          <p>
            This is a partner offer. Afordz may earn a commission if you buy through the configured
            affiliate link. That is the extent of the relationship described on this page.
          </p>
          <p>
            Checkout, delivery, and support are handled by the vendor, not through the Afordz cart
            or download flow.
          </p>
        </Spec>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getVisibleProductBySlug(slug);

  if (!product) {
    notFound();
  }

  if (isAffiliateProduct(product)) {
    return <AffiliateProductPage product={product} />;
  }

  return <DirectProductPage product={product} />;
}
