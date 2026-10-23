import Link from "next/link";
import { getCareerPosts, getCataloguePosts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Career & UI/UX guides for Indian freshers",
  description:
    "Free resume, job-search prompts, application tracker, and UI/UX course guides from Afordz—plus catalogue notes on templates and partner ebooks.",
  path: "/blog",
});

function formatPublished(published) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${published}T00:00:00Z`));
}

function PostCard({ post }) {
  const publishedLabel = formatPublished(post.published);
  return (
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
  );
}

export default function BlogPage() {
  const careerPosts = getCareerPosts();
  const cataloguePosts = getCataloguePosts();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Journal</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-ink sm:text-6xl">
          Career &amp; UI/UX guides for freshers
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Practical guides that link to free downloads on Afordz—resumes, prompts, trackers, and the on-site UI/UX
          course. Partner and catalogue notes sit below for template bundles and ebooks.
        </p>

        <ul className="mt-10 space-y-6">
          {careerPosts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Partner &amp; catalogue notes</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Deeper notes on paid templates and partner offers. Read the listing before you buy or leave for vendor
            checkout.
          </p>
          <ul className="mt-8 space-y-5">
            {cataloguePosts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-[1.5rem] border border-border bg-surface/80 p-5 sm:p-6">
                  <p className="text-xs text-muted">{formatPublished(post.published)}</p>
                  <h3 className="mt-2 font-display text-xl tracking-tight text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent-strong">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">{post.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
