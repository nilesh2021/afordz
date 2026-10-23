import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import CourseSyllabus from "@/components/CourseSyllabus";
import FreeCourseUnlockForm from "@/components/FreeCourseUnlockForm";
import JsonLd from "@/components/JsonLd";
import { getCourseLessonCount } from "@/data/training";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

function getSyllabusPhases(modules) {
  const phases = [];
  const seen = new Set();
  for (const module of modules) {
    const phase = module.phase || "Course";
    if (!seen.has(phase)) {
      seen.add(phase);
      phases.push(phase);
    }
  }
  return phases;
}

function getFirstLessonPath(track) {
  for (const module of track.course.modules ?? []) {
    for (const lesson of module.lessons ?? []) {
      if (lesson.content) {
        return `/courses/${track.slug}/${lesson.slug}`;
      }
    }
  }
  return `#syllabus`;
}

export default function TrainingFreeCourse({ track, unlocked = true }) {
  const course = track.course;
  const lessonCount = getCourseLessonCount(course);
  const phases = getSyllabusPhases(course.modules ?? []);
  const firstLessonPath = getFirstLessonPath(track);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: track.title, path: `/courses/${track.slug}` },
  ];
  const chips = [
    "Free",
    course.level,
    course.duration,
    `${course.modules.length} modules · ${lessonCount} lessons`,
  ];

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={courseJsonLd(track)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <article className="mx-auto w-full max-w-4xl">
        <Breadcrumbs items={crumbs} />

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-accent/40 bg-surface/80 px-6 py-8 shadow-[0_18px_50px_rgb(109_40_217/0.08)] sm:px-8 sm:py-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-accent/30 blur-2xl"
          />
          <p className="relative inline-block -rotate-2 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-surface shadow-[0_8px_20px_rgb(109_40_217/0.35)]">
            Free UI UX design course
          </p>
          <h1 className="relative mt-5 max-w-2xl font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl">
            {course.title}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-8 text-muted">{course.tagline}</p>
          <ul className="relative mt-6 flex flex-wrap items-center gap-2">
            {chips.map((chip, index) => (
              <li
                key={chip}
                className={
                  index === 0
                    ? "rounded-full bg-accent-strong px-3.5 py-1.5 text-xs font-semibold text-surface"
                    : "rounded-full border border-accent/50 bg-surface px-3 py-1 text-xs font-semibold text-ink"
                }
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="relative mt-4 max-w-2xl text-sm leading-6 text-muted">
            For beginners, developers, and marketers. Self-paced on this page — email unlock, no payment.
          </p>
          {unlocked ? (
            <div className="relative mt-7 flex flex-wrap gap-3">
              <Button href={firstLessonPath}>Start first lesson</Button>
              <Button href="#syllabus" variant="secondary">
                View syllabus
              </Button>
            </div>
          ) : (
            <div className="relative mt-7">
              <FreeCourseUnlockForm courseSlug={track.slug} courseTitle={course.title} />
            </div>
          )}
        </header>

        {course.process?.length ? (
          <section id="process" className="mt-14 scroll-mt-24">
            <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">Process</h2>
            <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {course.process.map((step, index) => (
                <li
                  key={step.id}
                  className={`rounded-2xl border border-accent/35 bg-surface/90 px-4 py-4 shadow-[0_10px_24px_rgb(109_40_217/0.06)] motion-safe:hover:-translate-y-0.5 ${
                    index % 2 === 0 ? "motion-safe:-rotate-1" : "motion-safe:rotate-1"
                  }`}
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-strong text-xs font-semibold text-surface">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {course.principles?.items?.length ? (
          <section id="principles" className="mt-10 scroll-mt-24">
            <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
              Jakob Nielsen’s heuristics
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">The checklist for testing.</p>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.principles.items.map((item, index) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-border bg-surface/80 px-4 py-3 text-sm leading-6"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/30 text-xs font-semibold text-accent-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-semibold text-ink">{item.title}. </span>
                    <span className="text-muted">{item.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section id="syllabus" className="mt-14 scroll-mt-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/40 bg-gradient-to-br from-accent/20 via-surface to-surface px-5 py-6 shadow-[0_18px_44px_rgb(109_40_217/0.08)] sm:px-7 sm:py-8">
            <p className="inline-block -rotate-1 rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
              Syllabus
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Course path
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Work the modules in order. Each phase builds on the last — from stakeholder research through a
              portfolio case study, then visual UI and Figma.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-accent/30 bg-surface/90 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">Modules</dt>
                <dd className="mt-1 font-display text-2xl text-ink">{course.modules.length}</dd>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-surface/90 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">Lessons</dt>
                <dd className="mt-1 font-display text-2xl text-ink">{lessonCount}</dd>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-surface/90 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">Level</dt>
                <dd className="mt-1 font-display text-2xl text-ink">{course.level}</dd>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-surface/90 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">Pace</dt>
                <dd className="mt-1 font-display text-2xl text-ink">{course.duration?.replace(/^About\s+/i, "") || "Self"}</dd>
              </div>
            </dl>

            {unlocked ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={firstLessonPath}>Start first lesson</Button>
                <Button href="#syllabus-list" variant="secondary">
                  Jump to modules
                </Button>
              </div>
            ) : (
              <p className="mt-6 text-sm leading-6 text-muted">
                Unlock the course above to open lesson links and start the first module.
              </p>
            )}

            {phases.length > 0 ? (
              <nav aria-label="Syllabus phases" className="mt-6 flex flex-wrap gap-2">
                {phases.map((phase) => (
                  <a
                    key={phase}
                    href={`#syllabus-${phase.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-accent/45 bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent-strong hover:bg-accent/15"
                  >
                    {phase}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>

          <div id="syllabus-list" className="mt-8 scroll-mt-28">
            <CourseSyllabus
              modules={course.modules}
              trackSlug={unlocked ? track.slug : null}
              lessonsLocked={!unlocked}
            />
          </div>
        </section>

        <p className="mt-10 text-sm leading-6 text-muted">
          A free Figma account is enough for later modules. There is no certificate or live class.{" "}
          <Link
            href="/courses"
            className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
          >
            All tracks
          </Link>
        </p>
      </article>
    </div>
  );
}
