import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Placeholder contact details for Afordz. Replace the email and phone before launch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800">Editable draft</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight text-zinc-950 sm:text-6xl">Contact</h1>
      <p className="mt-5 text-lg leading-8 text-zinc-600">
        Questions about the bundle can wait on a real inbox. The details below are placeholders.
      </p>

      <dl className="mt-10 space-y-4 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_16px_40px_rgb(20_18_28/0.06)] sm:p-8">
        <div>
          <dt className="text-sm font-semibold text-zinc-950">Email</dt>
          <dd className="mt-1">
            <a
              className="font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-800"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </dd>
          <dd className="mt-1 text-sm text-amber-950">{site.emailNote}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-zinc-950">Phone</dt>
          <dd className="mt-1 text-zinc-800">{site.phone}</dd>
          <dd className="mt-1 text-sm text-amber-950">{site.phoneNote}</dd>
        </div>
      </dl>

      <ContactForm />
    </div>
  );
}
