import Image from "next/image";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import TemplateMockup from "@/components/TemplateMockup";
import { downloadSteps, faqs, homeFeatures } from "@/data/site";
import { formatInr, getVisibleProducts, hasVerifiedPrice } from "@/data/products";

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

export const metadata = {
  title: { absolute: "Afordz — Digital resources" },
  description:
    "Afordz lists digital website resources with prices in INR. Shop the catalogue, then review a listing before you add it to the cart.",
};

function StepIcon({ index }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <rect x="6" y="12" width="36" height="26" rx="4" fill="#4f46e5" />
        <rect x="6" y="12" width="36" height="8" fill="#312e81" />
        <rect x="10" y="24" width="10" height="7" rx="1.5" fill="#fbbf24" />
        <path d="M14 24v2.2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V24" fill="none" stroke="#92400e" strokeWidth="1.2" />
        <rect x="24" y="25" width="14" height="2" rx="1" fill="#c7d2fe" />
        <rect x="24" y="29" width="10" height="2" rx="1" fill="#a5b4fc" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <path d="M14 8h14l8 8v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.6" />
        <path d="M28 8v8h8" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1.6" />
        <path d="M24 22v12" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M19 30l5 5 5-5" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
      <path d="M14 18h8.5a2 2 0 0 0 1.6-.8L26 14.5A2 2 0 0 1 27.6 14H34a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3z" fill="#4f46e5" />
      <path d="M11 22h26v14a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V22z" fill="#6366f1" />
      <path d="M16 18c0-4 2.2-7 8-7s8 3 8 7" fill="none" stroke="#312e81" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const featured = getVisibleProducts()[0];
  const preview = featured?.images?.[0];

  return (
    <>
      <section className="px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-10 overflow-hidden rounded-[2.5rem] border border-zinc-950/10 bg-white px-6 py-12 shadow-[0_30px_80px_rgb(20_18_28/0.08)] sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute -left-16 -top-24 size-72 rounded-full bg-indigo-200/70 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-amber-100 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-800">
              Website resources · INR
            </p>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl lg:text-[4.5rem]">
              Digital resources for your{" "}
              <em className="not-italic text-indigo-700">next big idea</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              Browse the catalogue by category, format, compatible tool, and price. Open an Afordz listing before you add one digital licence to the cart. Partner offers open on the vendor website.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/shop">Shop the catalogue</Button>
              <Button href="/contact" variant="secondary">
                Contact us
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="hero-stage relative rounded-[1.75rem] border border-indigo-100 bg-indigo-50/70 p-3 shadow-[0_24px_50px_rgb(67_56_202/0.08)] sm:p-4">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/home/workspace.jpg"
                  alt="Laptop on a desk showing a website layout"
                  width={640}
                  height={480}
                  className="aspect-[16/8] w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-3 rounded-2xl bg-white p-2 text-zinc-950">
                {preview ? (
                  <TemplateMockup
                    variant={preview.variant}
                    src={preview.src}
                    alt={preview.alt}
                    sizes="28rem"
                  />
                ) : (
                  <div className="aspect-[16/10] rounded-xl border border-dashed border-indigo-200" />
                )}
              </div>
              {featured ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {featured.category ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-800">
                      {featured.category}
                    </span>
                  ) : null}
                  {featured.framework ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                      {featured.framework}
                    </span>
                  ) : null}
                  {hasVerifiedPrice(featured) ? (
                    <span className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white">
                      {formatInr(featured.priceInr)}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">About</p>
            <h2 className="mt-3 max-w-lg font-display text-4xl tracking-tight text-zinc-950 sm:text-5xl">
              About Afordz
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-700">
              Afordz is a digital catalogue with prices in Indian rupees. Each product is sold as one digital licence.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-700">
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
              <li className="rounded-[1.5rem] bg-indigo-700 px-5 py-6 text-white">
                <p className="font-display text-2xl">Catalogue</p>
                <p className="mt-2 text-sm leading-6 text-indigo-100">Filter and sort on the shop page.</p>
              </li>
              <li className="rounded-[1.5rem] border border-zinc-950/10 bg-white px-5 py-6">
                <p className="font-display text-2xl text-zinc-950">One licence</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Each order keeps a single copy of a product.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 pb-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">Features</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight text-zinc-950 sm:text-5xl">
                What you can do in the shop today
              </h2>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {homeFeatures.map((feature, index) => {
              const photo = featurePhotos[feature.title];
              return (
                <li
                  key={feature.title}
                  className="overflow-hidden rounded-[1.75rem] border border-zinc-950/8 bg-white motion-safe:transition-transform motion-safe:hover:-translate-y-1"
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
                  <div className="p-6 sm:p-7">
                    <p className="font-display text-sm text-indigo-600">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-zinc-950">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{feature.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="steps" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">Process</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-zinc-950 sm:text-5xl">How an order works</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
            Three steps from the catalogue to checkout.
          </p>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-200 md:grid-cols-3">
            {downloadSteps.map((step, index) => (
              <li key={step.title} className="bg-[#f7f4ef] p-6 sm:p-8">
                <StepIcon index={index} />
                <p className="mt-5 text-sm font-semibold text-indigo-700">Step {index + 1}</p>
                <h3 className="mt-1 font-display text-2xl text-zinc-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-4xl tracking-tight text-zinc-950 sm:text-5xl">FAQ</h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-600">
              Short answers about the catalogue, delivery, and checkout.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl tracking-tight text-zinc-950">Browse the catalogue</h2>
          <Button href="/shop">Shop</Button>
        </div>
      </section>
    </>
  );
}
