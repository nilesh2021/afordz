import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import TemplateMockup from "@/components/TemplateMockup";
import { downloadSteps, faqs, homeFeatures } from "@/data/site";
import { formatInr, getVisibleProductBySlug, hasVerifiedPrice, productTitle } from "@/data/products";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

const featurePhotos = {
  "Filter the shop": {
    src: "/home/browse.jpg",
    alt: "A tablet showing a grid of website template thumbnails",
  },
  "Prices in INR": {
    src: "/home/checkout.jpg",
    alt: "A phone showing a simple payment confirmation screen",
  },
};

export const metadata = pageMetadata({
  title: { absolute: "Website Templates & Digital Resources | Afordz" },
  description:
    "Afordz sells digital resources and website template bundles in INR, including Bootstrap 5 templates and Tailwind CSS HTML templates. Browse the catalogue, then review a listing before checkout.",
  path: "/",
  images: [
    {
      src: "/home/workspace.jpg",
      alt: "Laptop on a desk showing a website layout",
      width: 640,
      height: 480,
    },
  ],
});

function StepIcon({ index }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <rect x="6" y="12" width="36" height="26" rx="4" fill="#6d28d9" />
        <rect x="6" y="12" width="36" height="8" fill="#1a1225" />
        <rect x="10" y="24" width="10" height="7" rx="1.5" fill="#a78bfa" />
        <path d="M14 24v2.2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V24" fill="none" stroke="#1a1225" strokeWidth="1.2" />
        <rect x="24" y="25" width="14" height="2" rx="1" fill="#e4dcf0" />
        <rect x="24" y="29" width="10" height="2" rx="1" fill="#a78bfa" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <path d="M14 8h14l8 8v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="#f3eef8" stroke="#6d28d9" strokeWidth="1.6" />
        <path d="M28 8v8h8" fill="#e4dcf0" stroke="#6d28d9" strokeWidth="1.6" />
        <path d="M24 22v12" fill="none" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M19 30l5 5 5-5" fill="none" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
      <path d="M14 18h8.5a2 2 0 0 0 1.6-.8L26 14.5A2 2 0 0 1 27.6 14H34a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3z" fill="#6d28d9" />
      <path d="M11 22h26v14a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V22z" fill="#a78bfa" />
      <path d="M16 18c0-4 2.2-7 8-7s8 3 8 7" fill="none" stroke="#1a1225" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const featured = getVisibleProductBySlug("bootstrap-templates-bundle");
  const preview = featured?.images?.[0];
  const featuredHref = featured ? `/products/${featured.slug}` : "/shop";

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <section className="px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-6 overflow-hidden rounded-[1.75rem] border border-border bg-surface px-5 py-8 shadow-[0_30px_80px_rgb(22_20_16/0.08)] sm:gap-10 sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute -left-16 -top-24 size-72 rounded-full bg-accent/35 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-ink/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              Website resources · INR
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[0.95] tracking-tight text-ink sm:mt-6 sm:text-6xl lg:text-[4.5rem]">
              Smart tools for your{" "}
              <em className="italic text-accent-strong">next project</em>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:mt-6 sm:text-lg sm:leading-7">
              Browse Bootstrap 5 templates, Tailwind CSS HTML templates, website template bundles, and other digital resources. Filter by category, format, compatible tool, and price in INR. Open a listing before you add one digital licence to the cart. Partner offers open on the vendor website.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-9">
              <Button href="/shop">Shop the catalogue</Button>
              {featured ? (
                <Button href={featuredHref} variant="secondary">
                  View the template bundle
                </Button>
              ) : (
                <Button href="/contact" variant="secondary">
                  Contact us
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="hero-stage relative rounded-[1.75rem] border border-accent/35 bg-background p-3 shadow-[0_24px_50px_rgb(22_20_16/0.08)] sm:p-4">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/home/workspace.jpg"
                  alt="Laptop on a desk showing a website layout"
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 80vw, 100vw"
                  className="aspect-[16/8] w-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
              <div className="mt-3 rounded-2xl bg-surface p-2 text-ink">
                {preview ? (
                  <TemplateMockup
                    variant={preview.variant}
                    src={preview.src}
                    alt={preview.alt}
                    sizes="28rem"
                  />
                ) : (
                  <div className="aspect-[16/10] rounded-xl border border-dashed border-accent/50" />
                )}
              </div>
              {featured ? (
                <Link href={featuredHref} className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink underline decoration-accent underline-offset-2">
                    {productTitle(featured)}
                  </span>
                  {featured.category ? (
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-accent-strong">
                      {featured.category}
                    </span>
                  ) : null}
                  {featured.framework ? (
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink/80">
                      {featured.framework}
                    </span>
                  ) : null}
                  {hasVerifiedPrice(featured) ? (
                    <span className="rounded-full bg-accent-strong px-3 py-1 text-xs font-semibold text-surface">
                      {formatInr(featured.priceInr)}
                    </span>
                  ) : null}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-10 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">About</p>
            <h2 className="mt-2 max-w-lg font-display text-3xl tracking-tight text-ink sm:mt-3 sm:text-5xl">
              About Afordz
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Afordz is a growing catalogue of digital resources with prices in Indian rupees. Each Afordz product is sold as one digital licence.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Unconfirmed details stay marked on the product page. File products are available as a private download after a captured Razorpay payment. A subscription includes only the details confirmed on its listing. Partner offers are checked out with the vendor.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[1.75rem] sm:col-span-2 lg:col-span-1">
              <Image
                src="/home/templates.jpg"
                alt="Printed website layout cards stacked on a desk"
                width={1024}
                height={768}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <ul className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-span-1">
              <li className="rounded-[1.5rem] bg-ink px-5 py-6 text-surface">
                <p className="font-display text-2xl">Catalogue</p>
                <p className="mt-2 text-sm leading-6 text-accent">Filter and sort on the shop page.</p>
              </li>
              <li className="rounded-[1.5rem] border border-border bg-surface px-5 py-6">
                <p className="font-display text-2xl text-ink">One licence</p>
                <p className="mt-2 text-sm leading-6 text-muted">Each order keeps a single copy of a product.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 pb-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Features</p>
              <h2 className="mt-2 max-w-xl font-display text-3xl tracking-tight text-ink sm:mt-3 sm:text-5xl">
                What you can do in the shop today
              </h2>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2">
            {homeFeatures.map((feature, index) => {
              const photo = featurePhotos[feature.title];
              return (
                <li
                  key={feature.title}
                  className="overflow-hidden rounded-[1.75rem] border border-border bg-surface motion-safe:transition-transform motion-safe:hover:-translate-y-1"
                >
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={960}
                      height={540}
                      className="aspect-[16/8] w-full object-cover"
                    />
                  ) : null}
                  <div className="p-4 sm:p-7">
                    <p className="font-display text-sm text-accent-strong">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="steps" className="px-4 py-10 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-ink px-5 py-8 text-surface sm:rounded-[2.5rem] sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Process</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-surface sm:mt-3 sm:text-5xl">How an order works</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-surface/70">
            Three steps from the catalogue to checkout.
          </p>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:mt-10 md:grid-cols-3">
            {downloadSteps.map((step, index) => (
              <li key={step.title} className="bg-ink p-4 sm:p-8">
                <StepIcon index={index} />
                <p className="mt-5 text-sm font-semibold text-accent">Step {index + 1}</p>
                <h3 className="mt-1 font-display text-2xl text-surface">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-surface/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="px-4 pb-12 sm:px-6 sm:pb-28">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-5xl">FAQ</h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Short answers about the catalogue, delivery, and checkout.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 rounded-2xl bg-ink px-5 py-5 text-surface sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-8">
          <h2 className="font-display text-2xl tracking-tight text-surface">Browse the catalogue</h2>
          <Button href="/shop">Shop</Button>
        </div>
      </section>
    </>
  );
}
