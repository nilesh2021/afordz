import Link from "next/link";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notes on website templates and digital resources",
  description:
    "Guides from Afordz on website template bundles and digital resources: what the Bootstrap 5 and Tailwind CSS HTML files include, and what the Canva listing does and does not confirm.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">Journal</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-zinc-950 sm:text-6xl">
          Notes on templates and digital resources
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
          Practical notes that match the product pages. Read what the Bootstrap 5 and Tailwind CSS HTML template bundle includes, or what Canva is useful for before the listing is available to buy.
        </p>
        <ul className="mt-10 space-y-6">
          {posts.map((post) => {
            const publishedLabel = new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(`${post.published}T00:00:00Z`));
            return (
              <li key={post.slug}>
                <article className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_18px_40px_rgb(20_18_28/0.06)] sm:p-8">
                  <p className="text-sm text-zinc-600">{publishedLabel}</p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-950">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo-800">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 leading-7 text-zinc-600">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-indigo-800 hover:text-indigo-950"
                  >
                    Read the article
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
