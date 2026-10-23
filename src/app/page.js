import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import FreeCourseCard from "@/components/FreeCourseCard";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import TemplateMockup from "@/components/TemplateMockup";
import {
  getHomeFreeProducts,
  HOME_ABOUT,
  HOME_FREE_UI_UX_COURSE,
  HOME_TRUST_SIGNALS,
} from "@/data/home";
import { downloadSteps, faqs, homeFeatures, socialLinks } from "@/data/site";
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
  title: {
    absolute: "Free Resume, Job Prompts & UI/UX Course for Indian Freshers | Afordz",
  },
  description:
    "Free ATS resume template, job-search ChatGPT prompts, application tracker, and a free UI/UX course for Indian freshers. Affordable website templates and digital resources in INR.",
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

function SocialIcon({ network }) {
  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function HomePage() {
  const freeProducts = getHomeFreeProducts();
  const featured = getVisibleProductBySlug("bootstrap-templates-bundle");
  const preview = featured?.images?.[0];
  const featuredHref = featured ? `/products/${featured.slug}` : "/shop";
  const activeSocialLinks = socialLinks.filter((link) => link.href?.trim());

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <section className="px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-border bg-surface px-5 py-8 shadow-[0_30px_80px_rgb(22_20_16/0.08)] sm:rounded-[2.5rem] sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -left-16 -top-24 size-72 rounded-full bg-accent/35 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              Free for Indian freshers
            </p>
            <h1 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-ink sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem]">
              Free resume templates, job-search prompts &amp; a free UI/UX course for Indian freshers.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:mt-6 sm:text-lg sm:leading-7">
              Start with four free resources on this site—no card required. When you are ready for more, browse
              affordable website templates and digital packs priced in INR.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Button href="#free-downloads">Get the free downloads</Button>
              <Button href="/shop?tier=free" variant="secondary">All free items in shop</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="free-downloads" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Free downloads</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Pick a free pack to start
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Enter your email on each listing to unlock the file. The UI/UX course opens in your browser—no checkout.
          </p>
          <ul className="mt-8 space-y-5">
            {freeProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
            <li>
              <FreeCourseCard course={HOME_FREE_UI_UX_COURSE} />
            </li>
          </ul>
        </div>
      </section>

      <section id="about" className="px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">About</p>
            <h2 className="mt-2 max-w-lg font-display text-3xl tracking-tight text-ink sm:text-5xl">
              {HOME_ABOUT.title}
            </h2>
            {HOME_ABOUT.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`max-w-xl text-base leading-7 text-muted ${index === 0 ? "mt-5" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-ink">{HOME_ABOUT.promise}</p>
            <div className="mt-8">
              <Button href={HOME_ABOUT.cta.href}>{HOME_ABOUT.cta.label}</Button>
            </div>
            {activeSocialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {activeSocialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent-strong"
                    >
                      <SocialIcon network={link.network} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {HOME_TRUST_SIGNALS.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-border bg-surface px-5 py-5 shadow-sm"
              >
                <p className="font-display text-xl text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="px-4 pb-4 sm:px-6">
          <div className="mx-auto grid w-full max-w-6xl gap-6 overflow-hidden rounded-[1.75rem] border border-border bg-surface/90 p-5 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Premium pick</p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink">{productTitle(featured)}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{featured.tagline}</p>
              {hasVerifiedPrice(featured) ? (
                <p className="mt-4 font-display text-2xl text-ink">{formatInr(featured.priceInr)}</p>
              ) : null}
              <div className="mt-6">
                <Button href={featuredHref}>View listing</Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              {preview ? (
                <TemplateMockup
                  variant={preview.variant}
                  src={preview.src}
                  alt={preview.alt}
                  sizes="(min-width: 640px) 28rem, 100vw"
                />
              ) : (
                <Image
                  src="/home/templates.jpg"
                  alt="Website template previews"
                  width={640}
                  height={400}
                  className="aspect-[16/10] w-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section id="features" className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Shop</p>
              <h2 className="mt-2 max-w-xl font-display text-3xl tracking-tight text-ink sm:text-4xl">
                What you can do in the catalogue
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
            >
              Open shop
            </Link>
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

      <section id="steps" className="px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-ink px-5 py-8 text-surface sm:rounded-[2.5rem] sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Process</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-surface sm:text-4xl">How a paid order works</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-surface/70">
            Free downloads skip checkout. These steps apply when you buy a paid listing.
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
              Short answers about free downloads, delivery, and checkout.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 rounded-2xl bg-ink px-5 py-5 text-surface sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-8">
          <h2 className="font-display text-2xl tracking-tight text-surface">Browse the full catalogue</h2>
          <Button href="/shop">Shop</Button>
        </div>
      </section>
    </>
  );
}
