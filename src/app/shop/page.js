import Image from "next/image";
import Catalogue from "@/components/catalogue/Catalogue";
import { parseCatalogueQuery } from "@/data/catalogue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: { absolute: "Digital Resources & Website Template Bundles | Afordz" },
  description:
    "Shop digital resources and website template bundles from Afordz, including Bootstrap 5 templates and Tailwind CSS HTML templates. Filter by category, format, and price in INR.",
  path: "/shop",
  images: [
    {
      src: "/home/browse.jpg",
      alt: "A tablet showing a grid of website template thumbnails",
      width: 960,
      height: 540,
    },
  ],
});

export default async function ShopPage({ searchParams }) {
  const initialQuery = parseCatalogueQuery(await searchParams);

  return (
    <>
      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-6 sm:pt-8">
          <div className="min-w-0 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Catalogue</p>
            <h1 className="mt-2 font-display text-3xl tracking-tight text-balance text-ink sm:text-4xl">
              Smart tools and digital resources
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Filter by category, format, tool, and price in INR. Partner offers check out on the vendor site.
            </p>
          </div>
          <div className="hidden shrink-0 grid-cols-2 gap-2 sm:grid sm:w-56 lg:w-64">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_12px_28px_rgb(22_20_16/0.08)]">
              <Image
                src="/home/browse.jpg"
                alt="A tablet showing a grid of website template thumbnails"
                width={960}
                height={540}
                className="aspect-[5/4] w-full object-cover"
                sizes="8rem"
                fetchPriority="high"
                loading="eager"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_12px_28px_rgb(22_20_16/0.08)]">
              <Image
                src="/home/templates.jpg"
                alt="Printed website layout cards stacked on a desk"
                width={1024}
                height={768}
                className="aspect-[5/4] w-full object-cover"
                sizes="8rem"
              />
            </div>
          </div>
        </div>
      </section>

      <Catalogue initialQuery={initialQuery} />
    </>
  );
}
