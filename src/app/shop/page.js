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
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">Catalogue</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-balance text-zinc-950 sm:text-6xl">
              Digital resources and website template bundles
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Browse website template bundles and digital resources, including Bootstrap 5 templates and Tailwind CSS HTML templates, by category, format, compatible tool, and price in INR. Partner offers are fulfilled on the vendor website.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_16px_40px_rgb(20_18_28/0.08)]">
              <Image
                src="/home/browse.jpg"
                alt="A tablet showing a grid of website template thumbnails"
                width={960}
                height={540}
                className="aspect-[4/5] w-full object-cover sm:aspect-[16/11]"
                sizes="(min-width: 1024px) 280px, 45vw"
                fetchPriority="high"
                loading="eager"
              />
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_16px_40px_rgb(20_18_28/0.08)]">
              <Image
                src="/home/templates.jpg"
                alt="Printed website layout cards stacked on a desk"
                width={1024}
                height={768}
                className="aspect-[4/5] w-full object-cover sm:aspect-[16/11]"
              />
            </div>
          </div>
        </div>
      </section>

      <Catalogue initialQuery={initialQuery} />
    </>
  );
}
