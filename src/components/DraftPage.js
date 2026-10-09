export default function DraftPage({ title, lede, children }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-semibold text-accent-strong">Editable draft</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{lede}</p>
      <div className="mt-10 space-y-8 text-base leading-7 text-foreground/80">{children}</div>
    </article>
  );
}

export function DraftSection({ title, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
