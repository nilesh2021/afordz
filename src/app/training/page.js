import Link from "next/link";
import Button from "@/components/Button";
import TrainingCourseCard from "@/components/TrainingCourseCard";
import { getTrainingProducts } from "@/data/products";
import { isFreeOnSiteCourse, LEARNING_TRACKS, TRAINING_STEPS } from "@/data/training";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: { absolute: "Free UI UX Design Course & Training Tracks | Afordz" },
  description:
    "Free UI UX design course on this site — learn UI UX fundamentals with Figma practice and usability heuristics. Plus downloadable packs for AI video, AI image generation, and content ideas when those listings are live.",
  path: "/training",
  keywords: [
    "free UI UX design course",
    "UI UX fundamentals",
    "learn UI UX",
    "Figma UI UX course",
    "Afordz training",
  ],
});

export default function TrainingPage() {
  const courses = getTrainingProducts();
  const featured = courses.slice(0, 6);

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <section className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">Training</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-balance text-ink sm:text-6xl">
            Practical skill courses, starting with free UI/UX
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Start with the free UI/UX Fundamentals course on this site. Other tracks are downloadable packs you
            buy in INR when a listing is live. These are not live cohorts, mentorship programmes, or a streaming
            classroom with progress tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/training/ui-ux">Open the free UI/UX course</Button>
            <Button href="#tracks" variant="secondary">
              View skill tracks
            </Button>
          </div>
        </section>

        <section id="tracks" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Skill tracks</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Pick a path. The UI/UX track is a free on-site course with a syllabus. Other tracks open downloadable
            listings when they are published.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_TRACKS.filter((track) => track.id !== "fundamentals").map((track) => {
              const freeCourse = isFreeOnSiteCourse(track);
              return (
                <li key={track.id}>
                  <Link
                    href={`/training/${track.slug}`}
                    className="block h-full rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-[0_18px_40px_rgb(22_20_16/0.06)] transition hover:border-accent/50"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl tracking-tight text-ink">{track.title}</h3>
                      {freeCourse ? (
                        <span className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                          Free
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">{track.description}</p>
                    <span className="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-accent underline-offset-4">
                      {freeCourse ? "Open course" : "View track"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Featured courses</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            The UI/UX course is free on its track page. Paid listings marked coming soon appear here for preview
            and cannot be purchased until the archive is ready.
          </p>
          {featured.length > 0 ? (
            <ul className="mt-8 space-y-6">
              {featured.map((product) => (
                <li key={product.id}>
                  <TrainingCourseCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-[1.75rem] border border-border bg-surface/90 p-6 text-base leading-7 text-muted">
              Courses are coming soon. Check back when the first Training packs are published, or browse the{" "}
              <Link
                href="/shop"
                className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
              >
                shop
              </Link>{" "}
              for other digital resources.
            </p>
          )}
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {TRAINING_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-[0_18px_40px_rgb(22_20_16/0.06)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-[1.75rem] border border-border bg-surface/90 p-6 sm:p-8">
          <h2 className="font-display text-3xl tracking-tight text-ink">What is not included</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
            <li>No live mentoring, cohorts, or scheduled classes.</li>
            <li>No streaming LMS, quizzes, or progress certificates.</li>
            <li>No Digistore partner courses in this hub — those stay under Shop partner offers.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
