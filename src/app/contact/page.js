import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Contact Afordz about a listing or an order.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-5xl tracking-tight text-zinc-950 sm:text-6xl">Contact</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
        Questions about a listing or an order can be sent by email.
      </p>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-zinc-950">Email</p>
        <a
          className="mt-2 inline-block font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-800"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}
