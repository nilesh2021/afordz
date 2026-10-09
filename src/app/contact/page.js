import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Email Afordz about a listing or an order. Card details are not collected on this page.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-5xl tracking-tight text-ink sm:text-6xl">Contact</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        Questions about a listing or an order can be sent by email.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-ink">Email</p>
        <a
          className="mt-2 inline-block font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}
