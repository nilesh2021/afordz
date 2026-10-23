import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LessonIcon } from "@/components/CourseLessonIcons";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

function LessonFigure({ image }) {
  if (!image?.src) return null;

  return (
    <figure className="mt-5 overflow-hidden rounded-[1.5rem] border border-accent/30 bg-surface shadow-[0_14px_36px_rgb(109_40_217/0.08)]">
      <Image
        src={image.src}
        alt={image.alt || ""}
        width={image.width || 960}
        height={image.height || 540}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 48rem"
      />
      {image.caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-sm leading-6 text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ProcessStrip({ steps }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Process stages">
      {steps.map((step, index) => (
        <li
          key={step.id || step.label}
          className={`rounded-2xl border border-accent/35 bg-surface/90 px-3 py-3 text-center shadow-[0_8px_20px_rgb(109_40_217/0.06)] ${
            index % 2 === 0 ? "motion-safe:-rotate-1" : "motion-safe:rotate-1"
          }`}
        >
          <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-accent/25 text-accent-strong">
            <LessonIcon name={step.icon} className="size-5" />
          </span>
          <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

function SnapshotField({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">{label}</dt>
      <dd className="mt-1.5 text-sm leading-6 text-ink">{value}</dd>
    </div>
  );
}

function LessonSnapshot({ snapshot }) {
  if (!snapshot) return null;

  const fields = Array.isArray(snapshot.fields) ? snapshot.fields : [];
  const audience = Array.isArray(snapshot.audience) ? snapshot.audience : [];

  return (
    <aside
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-accent/40 bg-surface shadow-[0_18px_44px_rgb(109_40_217/0.1)]"
      aria-label={snapshot.title || "Example document"}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-accent/25 blur-2xl"
      />
      <div className="relative border-b border-accent/25 bg-gradient-to-br from-accent/20 via-surface to-surface px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="inline-block -rotate-1 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
              {snapshot.eyebrow || "Example document"}
            </p>
            <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">{snapshot.title}</h3>
            {snapshot.subtitle ? <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{snapshot.subtitle}</p> : null}
          </div>
          {snapshot.badge ? (
            <span className="rounded-full border border-accent/50 bg-surface px-3 py-1 text-xs font-semibold text-ink">
              {snapshot.badge}
            </span>
          ) : null}
        </div>
      </div>

      <dl className="relative grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        {fields.map((field) => (
          <SnapshotField key={field.label} label={field.label} value={field.value} />
        ))}
      </dl>

      {audience.length > 0 ? (
        <div className="relative border-t border-border px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">
            {snapshot.audienceLabel || "Target audience"}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {audience.map((field) => (
              <SnapshotField key={field.label} label={field.label} value={field.value} />
            ))}
          </dl>
        </div>
      ) : null}

      {snapshot.note ? (
        <p className="relative border-t border-border bg-accent/10 px-5 py-4 text-sm leading-6 text-muted sm:px-6">
          {snapshot.note}
        </p>
      ) : null}
    </aside>
  );
}

function LessonEmpathyGrid({ empathy }) {
  if (!empathy) return null;

  const quadrants = Array.isArray(empathy.quadrants) ? empathy.quadrants : [];
  if (quadrants.length === 0) return null;

  return (
    <aside
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-accent/40 bg-surface shadow-[0_18px_44px_rgb(109_40_217/0.1)]"
      aria-label={empathy.title || "Empathy map"}
    >
      <div className="border-b border-accent/25 bg-gradient-to-br from-accent/20 via-surface to-surface px-5 py-5 sm:px-6">
        <p className="inline-block -rotate-1 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
          {empathy.eyebrow || "Empathy map"}
        </p>
        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">{empathy.title}</h3>
        {empathy.subtitle ? <p className="mt-2 text-sm leading-6 text-muted">{empathy.subtitle}</p> : null}
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {quadrants.map((quadrant, index) => (
          <div
            key={quadrant.label}
            className={`bg-surface px-5 py-5 sm:px-6 ${index % 2 === 0 ? "motion-safe:-rotate-[0.2deg]" : "motion-safe:rotate-[0.2deg]"}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">{quadrant.label}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              {(quadrant.items || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {empathy.note ? (
        <p className="border-t border-border bg-accent/10 px-5 py-4 text-sm leading-6 text-muted sm:px-6">{empathy.note}</p>
      ) : null}
    </aside>
  );
}

function LessonJourney({ journey }) {
  if (!journey) return null;

  const stages = Array.isArray(journey.stages) ? journey.stages : [];
  if (stages.length === 0) return null;

  return (
    <aside
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-accent/40 bg-surface shadow-[0_18px_44px_rgb(109_40_217/0.1)]"
      aria-label={journey.title || "Customer journey map"}
    >
      <div className="border-b border-accent/25 bg-gradient-to-br from-accent/20 via-surface to-surface px-5 py-5 sm:px-6">
        <p className="inline-block -rotate-1 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
          {journey.eyebrow || "Journey map"}
        </p>
        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">{journey.title}</h3>
        {journey.subtitle ? <p className="mt-2 text-sm leading-6 text-muted">{journey.subtitle}</p> : null}
      </div>
      <ol className="divide-y divide-border">
        {stages.map((stage, index) => (
          <li key={stage.title} className="px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-strong text-xs font-semibold text-surface">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-xl tracking-tight text-ink">{stage.title}</h4>
            </div>
            {stage.delights?.length ? (
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">Delights</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                  {stage.delights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {stage.opportunities?.length ? (
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">Opportunities</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                  {stage.opportunities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      {journey.note ? (
        <p className="border-t border-border bg-accent/10 px-5 py-4 text-sm leading-6 text-muted sm:px-6">{journey.note}</p>
      ) : null}
    </aside>
  );
}

function LessonComparison({ comparison }) {
  if (!comparison) return null;

  const columns = Array.isArray(comparison.columns) ? comparison.columns : [];
  const rows = Array.isArray(comparison.rows) ? comparison.rows : [];
  if (columns.length === 0 || rows.length === 0) return null;

  return (
    <aside
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-accent/40 bg-surface shadow-[0_18px_44px_rgb(109_40_217/0.1)]"
      aria-label={comparison.title || "Comparison"}
    >
      <div className="border-b border-accent/25 bg-gradient-to-br from-accent/20 via-surface to-surface px-5 py-5 sm:px-6">
        <p className="inline-block -rotate-1 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
          {comparison.eyebrow || "Example report"}
        </p>
        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">{comparison.title}</h3>
        {comparison.subtitle ? <p className="mt-2 text-sm leading-6 text-muted">{comparison.subtitle}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-accent/10">
              <th scope="col" className="px-4 py-3 font-semibold text-ink sm:px-5">
                {comparison.rowHeader || "Parameter"}
              </th>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold text-ink sm:px-5">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <th scope="row" className="px-4 py-3 align-top font-semibold text-accent-strong sm:px-5">
                  {row.label}
                </th>
                {(row.values || []).map((value, index) => (
                  <td key={`${row.label}-${columns[index] || index}`} className="px-4 py-3 align-top leading-6 text-muted sm:px-5">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {comparison.note ? (
        <p className="border-t border-border bg-accent/10 px-5 py-4 text-sm leading-6 text-muted sm:px-6">
          {comparison.note}
        </p>
      ) : null}
    </aside>
  );
}

function LessonSection({ section }) {
  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
  const bullets = Array.isArray(section.bullets) ? section.bullets : [];
  const icon = section.icon;

  return (
    <section id={section.id} className="mt-10 scroll-mt-24">
      <div className="flex items-start gap-3">
        {icon ? (
          <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/20 text-accent-strong shadow-[0_8px_18px_rgb(109_40_217/0.08)]">
            <LessonIcon name={icon} className="size-5" />
          </span>
        ) : null}
        <h2 className="font-display text-2xl tracking-tight text-ink">{section.heading}</h2>
      </div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-base leading-7 text-muted">
          {paragraph}
        </p>
      ))}
      {bullets.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <LessonSnapshot snapshot={section.snapshot} />
      <LessonEmpathyGrid empathy={section.empathy} />
      <LessonJourney journey={section.journey} />
      <LessonComparison comparison={section.comparison} />
      <LessonFigure image={section.image} />
    </section>
  );
}

function topicClass(active) {
  return [
    "block rounded-xl px-2.5 py-1.5 text-sm leading-5",
    active
      ? "bg-accent-strong font-semibold text-surface"
      : "text-ink hover:bg-accent/15",
  ].join(" ");
}

const navPill =
  "inline-flex rounded-full border border-accent/40 bg-surface px-4 py-2 text-sm font-semibold text-ink hover:border-accent-strong hover:bg-accent/15";

function LessonTopics({ track, lesson, coursePath, sections, showHeading = true }) {
  const modules = Array.isArray(track.course?.modules) ? track.course.modules : [];

  return (
    <nav aria-label="Topics">
      {showHeading ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">Topics</p>
      ) : null}
      <p className={showHeading ? "mt-3" : undefined}>
        <Link
          href={coursePath}
          className="text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
        >
          Course overview
        </Link>
      </p>
      <ol className="mt-5 space-y-5">
        {modules.map((module, moduleIndex) => (
          <li key={module.id}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {String(moduleIndex + 1).padStart(2, "0")} · {module.title}
            </p>
            {(module.lessons ?? []).some((item) => item.content) ? (
              <ol className="mt-1.5 space-y-0.5">
                {(module.lessons ?? []).map((item) => {
                  const current = item.slug === lesson.slug;
                  const href = item.content ? `${coursePath}/${item.slug}` : null;

                  return (
                    <li key={item.slug}>
                      {href ? (
                        <Link href={href} className={topicClass(current)} aria-current={current ? "page" : undefined}>
                          {item.title}
                        </Link>
                      ) : (
                        <span className="block rounded-lg px-2 py-1.5 text-sm leading-5 text-muted">{item.title}</span>
                      )}
                      {current && sections.length > 0 ? (
                        <ol className="mt-0.5 ml-2 space-y-0.5 border-l border-border pl-3">
                          {sections.map((section) => (
                            <li key={section.id}>
                              <a
                                href={`#${section.id}`}
                                className="block rounded-md px-2 py-1 text-xs leading-5 text-muted hover:bg-accent/10 hover:text-ink"
                              >
                                {section.heading}
                              </a>
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function CourseLesson({ track, lesson, prev, next }) {
  const coursePath = `/courses/${track.slug}`;
  const lessonPath = `${coursePath}/${lesson.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: track.title, path: coursePath },
    { name: lesson.title, path: lessonPath },
  ];
  const moduleNumber = String((lesson.moduleIndex ?? 0) + 1).padStart(2, "0");
  const content = lesson.content;
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto lg:[scrollbar-width:thin]">
            <div className="lg:hidden">
              <details className="rounded-3xl border border-accent/35 bg-surface/90 px-4 py-3 shadow-[0_12px_30px_rgb(109_40_217/0.06)]">
                <summary className="cursor-pointer text-sm font-semibold text-ink">Topics</summary>
                <div className="mt-4 pb-2">
                  <LessonTopics
                    track={track}
                    lesson={lesson}
                    coursePath={coursePath}
                    sections={sections}
                    showHeading={false}
                  />
                </div>
              </details>
            </div>
            <div className="hidden rounded-3xl border border-accent/35 bg-surface/90 p-4 shadow-[0_12px_30px_rgb(109_40_217/0.06)] lg:block">
              <LessonTopics track={track} lesson={lesson} coursePath={coursePath} sections={sections} />
            </div>
          </aside>

          <article className="mt-8 max-w-3xl lg:mt-0">
            <header>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
                Module {moduleNumber}
                {lesson.duration ? ` · ${lesson.duration}` : ""}
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl">
                {lesson.title}
              </h1>
              {content?.lede ? <p className="mt-4 text-lg leading-8 text-muted">{content.lede}</p> : null}
            </header>

            <LessonFigure image={content?.heroImage} />
            <ProcessStrip steps={content?.processStrip} />

            {sections.map((section) => (
              <LessonSection key={section.id} section={section} />
            ))}

            <nav aria-label="Lesson" className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              {prev ? (
                <Link href={`${coursePath}/${prev.slug}`} className={navPill}>
                  Previous: {prev.title}
                </Link>
              ) : null}
              {next ? (
                <Link href={`${coursePath}/${next.slug}`} className={navPill}>
                  Next: {next.title}
                </Link>
              ) : (
                <Link href={`${coursePath}#syllabus`} className={navPill}>
                  Back to syllabus
                </Link>
              )}
              {next ? (
                <Link href={`${coursePath}#syllabus`} className={navPill}>
                  Course syllabus
                </Link>
              ) : null}
            </nav>
          </article>
        </div>
      </div>
    </div>
  );
}
