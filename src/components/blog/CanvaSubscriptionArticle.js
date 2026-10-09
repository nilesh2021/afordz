import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { site } from "@/data/site";

const toc = [
  { id: "what-canva-is", label: "What Canva is" },
  { id: "social-and-marketing", label: "Social and marketing graphics" },
  { id: "presentations-and-docs", label: "Presentations, posters, and docs" },
  { id: "why-it-helps", label: "Why it helps" },
  { id: "afordz-listing", label: "The Afordz listing" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    question: "Do I need design training to use Canva?",
    answer:
      "No. Canva is built so you can start from a template and change text, photos, and colours in the browser. Design training helps with layout judgment, but it is not required to produce a simple post or slide.",
  },
  {
    question: "What is Canva most useful for?",
    answer:
      "Everyday visual work: social posts, stories, presentations, posters, flyers, and simple documents. It is less useful when you need a coded website, a print-production file with a specialist workflow, or software you install and run offline.",
  },
  {
    question: "Does the Afordz listing include every Canva feature?",
    answer:
      "No. The product page confirms a one-year term and a catalogue price. It does not confirm the plan name, the number of seats, or which Canva features are included. Read that page before you treat any feature as part of the offer.",
  },
  {
    question: "Can I buy it now?",
    answer:
      "Not yet. The listing is marked coming soon, so it cannot be added to the cart.",
  },
];

export default function CanvaSubscriptionArticle({ post, price, publishedLabel, jsonLd }) {
  return (
    <article className="px-4 py-12 sm:px-6 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">
          <Link href="/blog" className="hover:text-indigo-900">
            Journal
          </Link>
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-balance text-zinc-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          {publishedLabel} · {site.name}
        </p>
        <p className="mt-6 text-lg leading-8 text-zinc-600">
          Canva is a browser design tool for people who need finished-looking graphics without building every layout from a blank file. This article is about that work. The Afordz listing, at{" "}
          {price ? <strong className="font-semibold text-zinc-950">{price}</strong> : "the price on the product page"}{" "}
          for one year, is covered at the end.
        </p>

        <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_18px_40px_rgb(20_18_28/0.08)]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            className="aspect-[16/9] w-full object-cover"
            priority
          />
          <figcaption className="bg-white/80 px-4 py-3 text-sm leading-6 text-zinc-600">
            This photograph is an article image. It is not a Canva screenshot.
          </figcaption>
        </figure>

        <nav aria-label="On this page" className="mt-10 rounded-[1.75rem] border border-white/80 bg-white/75 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">On this page</h2>
          <ol className="mt-4 space-y-2 text-sm leading-6">
            {toc.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-indigo-800 hover:text-indigo-950">
                  {index + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12 text-base leading-7 text-zinc-700">
          <section id="what-canva-is" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">What Canva is</h2>
            <p className="mt-4">
              Canva is an online editor. You open it in a current browser, pick a size or a template, and edit on the canvas. Text, photos, shapes, and icons sit on the page so you can move them instead of writing layout code.
            </p>
            <p className="mt-4">
              That is useful when the job is a visual, not a website. A shop announcement, a class slide, a menu, or a one-page flyer can start from a template that already has type sizes and spacing. You replace the sample words and pictures with your own.
            </p>
          </section>

          <section id="social-and-marketing" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">Social and marketing graphics</h2>
            <p className="mt-4">
              Social sizes are where Canva saves the most time. A square post, a story, and a cover are different frames. Templates already match those frames, so you are not guessing pixel sizes for each network.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Posts and stories for a product, an event, or a weekly update.</li>
              <li>Simple ads and offer cards, with one headline and one picture.</li>
              <li>A repeated look: the same colours and type across a set of posts, so a small account does not look random.</li>
            </ul>
            <p className="mt-4">
              You still write the message. Canva does not decide the offer, the audience, or whether a claim on the graphic is true. It makes the layout faster to assemble.
            </p>
          </section>

          <section id="presentations-and-docs" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">Presentations, posters, and docs</h2>
            <p className="mt-4">
              The same editor covers slides, posters, flyers, and simple documents. A presentation template gives you a title slide and a content slide you can duplicate. A poster template gives you a hierarchy: a large title, a short line of detail, and a place for a date or a price.
            </p>
            <p className="mt-4">
              That is useful for a pitch, a workshop, a school notice, or a shop window sheet. Export or share from Canva when you are ready to show the file. For a coded site, or for a file another specialist tool must finish, Canva is a starting layout rather than the final production system.
            </p>
          </section>

          <section id="why-it-helps" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">Why it helps</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>You work in the browser, so there is no design application to install for ordinary graphics.</li>
              <li>Templates reduce the blank-page problem. You edit a structure that already fits the format.</li>
              <li>One place can hold social graphics, slides, and print-style sheets, which helps when one person does all of that work.</li>
              <li>Sharing a design for comment is part of the product, so a colleague can see the same file without receiving a stack of loose images first.</li>
            </ul>
            <p className="mt-4">
              It is a weaker fit if you need original illustration from scratch, a multi-page brand system built in desktop publishing software, or an offline archive of every asset. Canva’s own plan limits also decide storage, brand controls, and who may edit a file. Those limits depend on the Canva plan, which this article does not assign to a specific Afordz offer.
            </p>
          </section>

          <section id="afordz-listing" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">The Afordz listing</h2>
            <p className="mt-4">
              Afordz lists a Canva Subscription at {price ?? "the catalogue price"} for one year, in Design Tools. The page is not an official Canva storefront. It is marked coming soon, so it cannot be added to the cart.
            </p>
            <p className="mt-4">
              The plan name, the number of seats, and how access would be delivered are not confirmed. The listing does not include a download file. The{" "}
              <Link href="/products/canva-subscription" className="font-semibold text-indigo-800 hover:text-indigo-950">
                product page
              </Link>{" "}
              is the place to check those fields before the listing is available to buy.
            </p>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">FAQs</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-zinc-950">{item.question}</h3>
                  <p className="mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/80 bg-white/80 p-6 sm:p-8">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">See the listing</h2>
            <p className="mt-4">
              The product page records the one-year price and the fields that are still open. It is marked coming soon.
            </p>
            <div className="mt-6">
              <Button href="/products/canva-subscription">
                View the Canva listing{price ? ` · ${price}` : ""}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
