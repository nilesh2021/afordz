import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { productTitle } from "@/data/products";
import { site } from "@/data/site";

function RichText({ parts }) {
  if (typeof parts === "string") {
    return parts;
  }
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <span key={index}>{part}</span>;
    }
    return (
      <Link
        key={index}
        href={part.href}
        className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
      >
        {part.label}
      </Link>
    );
  });
}

export default function PartnerOfferArticle({ post, product, publishedLabel, jsonLd, article }) {
  const listingHref = product ? `/products/${product.slug}` : "/shop";
  const listingName = product ? productTitle(product) : "partner listing";
  const toc = [...article.toc, { id: "faqs", label: "FAQs" }];

  return (
    <article className="px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={jsonLd} />
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          <Link href="/blog" className="hover:text-ink">
            Journal
          </Link>
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {publishedLabel} · {site.name}
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          <RichText parts={article.lede} />
        </p>

        <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-border shadow-[0_18px_40px_rgb(20_18_28/0.08)]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            className="aspect-[16/9] w-full object-cover object-top"
            sizes="(min-width: 768px) 768px, 100vw"
            fetchPriority="high"
            loading="eager"
          />
          <figcaption className="bg-surface/90 px-4 py-3 text-sm leading-6 text-muted">
            <RichText parts={article.figcaption} />
          </figcaption>
        </figure>

        <nav aria-label="On this page" className="mt-10 rounded-[1.75rem] border border-border bg-surface/90 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">On this page</h2>
          <ol className="mt-4 space-y-2 text-sm leading-6">
            {toc.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
                >
                  {index + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12 text-base leading-7 text-muted">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-3xl tracking-tight text-ink">{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="mt-4">
                  <RichText parts={paragraph} />
                </p>
              ))}
              {section.list?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {section.list.map((item, index) => (
                    <li key={index}>
                      <RichText parts={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="faqs" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">FAQs</h2>
            <div className="mt-6 space-y-6">
              {article.faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                  <p className="mt-2">
                    <RichText parts={item.answer} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-border bg-surface/90 p-6 sm:p-8">
            <h2 className="font-display text-3xl tracking-tight text-ink">See the listing</h2>
            <p className="mt-4">
              <RichText parts={article.ctaNote} />
            </p>
            <div className="mt-6">
              <Button href={listingHref}>
                {article.ctaLabel || `View ${listingName}`}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
