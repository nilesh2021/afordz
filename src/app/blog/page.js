import Link from "next/link";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notes on templates, ebooks, and digital resources",
  description:
    "Afordz guides on Bootstrap and Tailwind HTML templates, Canva, keto and mindset ebooks, affiliate marketing, freelancer productivity kits, and print-on-demand typography designs.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Journal</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-ink sm:text-6xl">
          Notes on templates, ebooks, and digital resources
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Practical notes that match the product pages: website template bundles, Canva, partner ebooks, downloads, and design resources. Read what a listing includes before you buy or follow a partner checkout.
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
                <article className="rounded-[2rem] border border-border bg-surface/90 p-6 shadow-[0_18px_40px_rgb(22_20_16/0.06)] sm:p-8">
                  <p className="text-sm text-muted">{publishedLabel}</p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent-strong">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 leading-7 text-muted">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
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
