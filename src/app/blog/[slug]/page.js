import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CanvaSubscriptionArticle from "@/components/blog/CanvaSubscriptionArticle";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, posts } from "@/data/posts";
import { formatInr, getVisibleProductBySlug, isComingSoon, productTitle } from "@/data/products";
import { site } from "@/data/site";
import { absoluteUrl, canonicalUrl, pageMetadata } from "@/lib/seo";

const toc = [
  { id: "the-split", label: "The 500 + 500 split" },
  { id: "whats-inside", label: "What the bundle includes" },
  { id: "bootstrap-vs-tailwind", label: "Bootstrap 5 vs Tailwind CSS" },
  { id: "choosing-a-layout", label: "Choosing a layout" },
  { id: "download-and-customise", label: "Download, preview, and customise" },
  { id: "what-to-check", label: "What to check before you publish" },
  { id: "who-it-suits", label: "Who it suits" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    question: "Do I need to know Bootstrap or Tailwind already?",
    answer:
      "You can change visible text in a text editor without either framework. Rearranging layout, spacing, and components is much easier if you already know the framework that file uses. Bootstrap pages rely on Bootstrap class names and, where a script is included, Bootstrap’s JavaScript. Tailwind pages rely on utility classes processed by the Tailwind CDN script.",
  },
  {
    question: "Which editor should I use?",
    answer:
      "Any editor that can open an HTML file is enough. The download does not include a visual builder, a design app project, or a required plugin.",
  },
  {
    question: "How do I get the download?",
    answer:
      "Add one digital licence to the cart and complete checkout. The server releases a private ZIP only after it confirms a captured Razorpay payment for the same order, amount, and INR currency. That link expires after 48 hours.",
  },
  {
    question: "What am I allowed to do with the files?",
    answer:
      "The product page does not publish a usage licence. The store terms are an editable draft and state that they do not grant rights to copy, adapt, resell, or redistribute the templates. A text file inside the ZIP also reserves rights for NSL Digital Lab and says original branded material needs written permission. Read both before you use a page on a client site or a commercial project.",
  },
];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Blog" };
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published,
    images: [post.image],
  });
}

function jsonLd(post, product) {
  const url = canonicalUrl(`/blog/${post.slug}`);
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: "en",
    articleSection: post.articleSection || "Website Templates",
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: url,
    image: absoluteUrl(post.image.src),
  };

  if (product && Number.isFinite(product.priceInr) && !isComingSoon(product)) {
    data.about = {
      "@type": "Product",
      name: productTitle(product),
      description: product.tagline,
      offers: {
        "@type": "Offer",
        priceCurrency: product.currency || "INR",
        price: product.priceInr,
        url: canonicalUrl(`/products/${product.slug}`),
      },
    };
  }

  return data;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const product = getVisibleProductBySlug(post.productSlug);
  const price = product && Number.isFinite(product.priceInr) ? formatInr(product.priceInr) : null;
  const publishedLabel = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${post.published}T00:00:00Z`));

  if (post.slug === "canva-subscription") {
    return (
      <CanvaSubscriptionArticle
        post={post}
        product={product}
        price={price}
        publishedLabel={publishedLabel}
        jsonLd={jsonLd(post, product)}
      />
    );
  }

  return (
    <article className="px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={jsonLd(post, product)} />
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
          The Afordz HTML website template bundle is a ZIP of 1,000 standalone pages: 500 Bootstrap 5 files and 500 Tailwind CSS files. It is listed at{" "}
          {price ? <strong className="font-semibold text-ink">{price}</strong> : "the price on the product page"}. This article describes the archive that ships with that listing, including what the files do not contain.
        </p>

        <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-border shadow-[0_18px_40px_rgb(20_18_28/0.08)]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            className="aspect-[16/9] w-full object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
            fetchPriority="high"
            loading="eager"
          />
          <figcaption className="bg-surface/90 px-4 py-3 text-sm leading-6 text-muted">
            This photograph is an article image. It is not a screenshot of a file in the download. The{" "}
            <Link href="/products/bootstrap-templates-bundle" className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
              product page
            </Link>{" "}
            shows screenshots of six HTML files from the ZIP.
          </figcaption>
        </figure>

        <nav aria-label="On this page" className="mt-10 rounded-[1.75rem] border border-border bg-surface/90 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">On this page</h2>
          <ol className="mt-4 space-y-2 text-sm leading-6">
            {toc.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                  {index + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12 text-base leading-7 text-muted">
          <section id="the-split" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">The 500 + 500 split</h2>
            <p className="mt-4">
              Bootstrap 5 and Tailwind CSS templates are both in this download, and they are kept apart. The outer folder is named “1000 Website Templates Mega Bundle”. That folder name does not mean every page is a Bootstrap website template. Inside it, BS500DEAL holds the Bootstrap files and TW500DEAL holds the Tailwind HTML templates.
            </p>
            <p className="mt-4">
              Each side has 500 HTML files, named index1.html through index500.html. A page is one file. There is no separate project folder per template, and there is no shared local stylesheet you can edit for the whole set. If you want a Bootstrap layout, open a file from BS500DEAL. If you want Tailwind utilities, open a file from TW500DEAL. Mixing the two in one page is possible later, but none of the supplied files is written that way.
            </p>
          </section>

          <section id="whats-inside" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">What the bundle includes</h2>
            <p className="mt-4">
              The ZIP contains 1,000 HTML files, plus three short text files and one editor settings file under the Tailwind folder. Counted from the archive: 500 files in BS500DEAL and 500 files in TW500DEAL. Styles, icons, and fonts are loaded from the network.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Every sampled Bootstrap file links Bootstrap 5.3.0-alpha1 CSS from jsDelivr, Font Awesome 5.2 from a CDN, and the DM Sans and Sora fonts from Google Fonts. A small style block in the head sets those fonts. The file also points at favicon.ico, which is not in the ZIP.</li>
              <li>A sampled Tailwind file loads the Tailwind Play CDN script at cdn.tailwindcss.com, the same Font Awesome stylesheet, and placeholder images from dummyimage.com. It also embeds a YouTube video. Those images are not files in the download.</li>
              <li>There are no local CSS, JavaScript, or image assets, and no per-template kit of partials. An internet connection is required to see a page as designed.</li>
            </ul>
            <p className="mt-4">
              The readme in the Bootstrap folder describes a Bootstrap 5.3.8 modernisation. The HTML that was checked requests 5.3.0-alpha1 instead. Treat the link in each file as the version that page will load. The Tailwind folder’s readme repeats the Bootstrap 5.3.8 title even though those pages load Tailwind. The shop listing is the clearer description: 1,000 single-page HTML files, split evenly, with CDN dependencies.
            </p>
            <p className="mt-4">
              Sampled Bootstrap titles read “Bootstrap 5 Page”. Sampled Tailwind titles read “Tailwind Starter Kit | TailwindStarterKit.com”. The product gallery shows the top of six of those files. Open a file to see its full page. Do not judge a page by this article’s photograph.
            </p>
          </section>

          <section id="bootstrap-vs-tailwind" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">Bootstrap 5 vs Tailwind CSS</h2>
            <p className="mt-4">
              Both halves are responsive website templates in the sense that the sampled files include a viewport meta tag and use a framework that is built for flexible layouts. That is not a test result for every breakpoint, every browser, or every one of the 1,000 files. The practical difference is how you change the design.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full min-w-[36rem] text-left text-sm leading-6">
                <caption className="sr-only">
                  Comparison of styling approach, components, and customisation for the Bootstrap 5 files and the Tailwind CSS files in this bundle
                </caption>
                <thead className="bg-background text-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Topic</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Bootstrap 5 files</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Tailwind CSS files</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <th scope="row" className="px-4 py-3 align-top font-semibold text-ink">Styling approach</th>
                    <td className="px-4 py-3 align-top">Named component and layout classes, such as containers, grids, and buttons, from the Bootstrap stylesheet.</td>
                    <td className="px-4 py-3 align-top">Utility classes written on the elements. The Play CDN script generates the CSS in the browser.</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="px-4 py-3 align-top font-semibold text-ink">Components</th>
                    <td className="px-4 py-3 align-top">Bootstrap’s prebuilt components. Interactive pieces need Bootstrap’s JavaScript as well as the CSS. Check the script tags in the file you open.</td>
                    <td className="px-4 py-3 align-top">No separate component library in the CDN script. Sections are ordinary HTML styled with utilities. Icons still come from Font Awesome.</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="px-4 py-3 align-top font-semibold text-ink">Customisation</th>
                    <td className="px-4 py-3 align-top">Edit the HTML and the inline font styles. Broader visual changes mean extra CSS or different Bootstrap classes. There is no local Bootstrap source to recompile.</td>
                    <td className="px-4 py-3 align-top">Edit the utility classes in the HTML. There is no tailwind.config file in the ZIP. The Play CDN is a preview tool, not a production build step.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="choosing-a-layout" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">Choosing a layout</h2>
            <p className="mt-4">
              The readme at the root of the ZIP says the package includes business, agency, portfolio, SaaS, ecommerce, and landing-page layouts. The product gallery does not use those six labels. It shows screenshots of six files whose visible tops are a dark hero, a photo cover, a marketing page, a product page, a landing page, and a feature list. Pick a file by opening it.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">Business, agency, and portfolio</h3>
            <p className="mt-2">
              Look for a clear company or personal name, a short services or project list, and a contact block you can replace. A business page usually leads with what the organisation does. An agency page often leads with the studio itself. A portfolio page should make the work samples the main content. Swap the placeholder Latin text and any stock-style copy before you show the page to anyone else.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">SaaS and landing pages</h3>
            <p className="mt-2">
              A SaaS-style page in this kind of set is a marketing layout: a product headline, a feature row, and a signup or call-to-action area. A landing page is narrower, with one offer and one next step. The HTML can collect nothing by itself. A form that only has markup will not store enquiries until you connect it to a service you control.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">Ecommerce layouts</h3>
            <p className="mt-2">
              An ecommerce file here is a frontend design: product tiles, prices written into the HTML, and links between pages you choose to keep. Checkout, payments, stock, tax, and customer accounts are not included and need a separate build. Do not treat a static product grid as a shop.
            </p>
          </section>

          <section id="download-and-customise" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">Download, preview, and customise</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5">
              <li>
                Open the{" "}
                <Link href="/products/bootstrap-templates-bundle" className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                  bundle listing
                </Link>{" "}
                from the{" "}
                <Link href="/shop" className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                  shop
                </Link>
                . The catalogue price is {price ?? "shown on that page"}. The cart keeps one digital licence and will not add a second copy.
              </li>
              <li>Pay through checkout. After the server confirms a captured Razorpay payment for that order, it opens a private download named bootstrap-templates-bundle.zip. The link expires in 48 hours.</li>
              <li>Extract the ZIP. You should see the folder “1000 Website Templates Mega Bundle”, then BS500DEAL and TW500DEAL.</li>
              <li>Open one index file in a current browser while you are online. If the CSS does not appear, the CDN request failed or the file was opened without a network connection. The pages are not an offline kit.</li>
              <li>Duplicate the file before you edit it, then change the title, headings, and body copy. Replace dummyimage.com URLs with images you have the right to use. Remove the YouTube embed if you do not want that video.</li>
              <li>For a public site, copy the finished HTML to your host. Plan to replace the Tailwind Play CDN with a built stylesheet if you ship a Tailwind page, and confirm that the Bootstrap version in the link tag is the one you intend to keep.</li>
            </ol>
          </section>

          <section id="what-to-check" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">What to check before you publish</h2>
            <h3 className="mt-6 text-xl font-semibold text-ink">Dependencies</h3>
            <p className="mt-2">
              Bootstrap CSS, the Tailwind Play CDN, Font Awesome, Google Fonts, dummyimage.com, and any embedded video all require a network. If one host is blocked, that part of the page will not render. Favicon links that point at favicon.ico will 404 until you add an icon yourself.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">Browser compatibility</h3>
            <p className="mt-2">
              The product page says you need a current browser that can open HTML. The sampled files set a viewport. Nothing in the store listing is a browser matrix, and alpha Bootstrap is not the same promise as a current stable release. Click through the page you actually want, including the width you care about.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">Accessibility</h3>
            <p className="mt-2">
              The included readmes talk about accessible interfaces. That sentence is not an audit of these 1,000 files. Check headings, button names, colour contrast, keyboard use, and form labels on the page you will publish. Empty description and author meta tags, which appear in the sampled Bootstrap head, do not make a page SEO-ready.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-ink">Licence and support</h3>
            <p className="mt-2">
              No usage licence is published on the product page. The{" "}
              <Link href="/terms" className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                terms
              </Link>{" "}
              are a draft and do not grant rights to copy, adapt, resell, or redistribute the files. The ZIP readmes reserve NSL Digital Lab branding and original material, and they note that third-party libraries stay under their own licences. Support hours and a support window are not listed for this product. The{" "}
              <Link href="/contact" className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong">
                contact page
              </Link>{" "}
              still shows placeholder contact details.
            </p>
          </section>

          <section id="who-it-suits" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">Who it suits</h2>
            <p className="mt-4">
              The bundle suits someone who wants a large folder of single-page HTML starting points and is comfortable editing markup. It is a useful reference if you already work in Bootstrap or Tailwind and want more layouts to adapt by hand.
            </p>
            <p className="mt-4">
              It is a poor fit if you need a multi-file theme, a local build with your own CSS and images, an offline demo, or a working ecommerce backend. It is also a poor fit if you need a written licence, a support commitment, or a promise that every file has been checked for accessibility, speed, or search performance. Those claims are not on the product page, and this article does not add them.
            </p>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-ink">FAQs</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                  <p className="mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-border bg-surface/90 p-6 sm:p-8">
            <h2 className="font-display text-3xl tracking-tight text-ink">See the listing</h2>
            <p className="mt-4">
              The product page is the record of the price, the file list, and the preview note. It is the page to use before you add the licence to the cart.
            </p>
            <div className="mt-6">
              <Button href="/products/bootstrap-templates-bundle">
                View the template bundle{price ? ` · ${price}` : ""}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
