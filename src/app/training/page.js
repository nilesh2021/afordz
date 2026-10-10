import Link from "next/link";
import Button from "@/components/Button";
import TrainingCourseCard from "@/components/TrainingCourseCard";
import { getTrainingProducts } from "@/data/products";
import { LEARNING_TRACKS, TRAINING_STEPS } from "@/data/training";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Training courses — downloadable skill packs",
  description:
    "Afordz Training: paid downloadable courses for UI/UX, AI video, AI image generation, and content ideas. Pay in INR, then download a private ZIP. No live classroom or streaming LMS.",
  path: "/training",
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
            Downloadable courses for practical skills
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Afordz Training is a set of paid digital course packs. You buy one licence, pay in INR through
            Razorpay, and receive a private download. These are not live cohorts, mentorship programmes, or a
            streaming classroom with progress tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/shop?category=Training">Browse in the shop</Button>
            <Button href="#tracks" variant="secondary">
              View skill tracks
            </Button>
          </div>
        </section>

        <section id="tracks" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Skill tracks</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Pick a path, then open the courses in that track. Every course still uses the same product page and
            checkout as the rest of the catalogue.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_TRACKS.filter((track) => track.id !== "fundamentals").map((track) => (
              <li key={track.id}>
                <Link
                  href={`/training/${track.slug}`}
                  className="block h-full rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-[0_18px_40px_rgb(22_20_16/0.06)] transition hover:border-accent/50"
                >
                  <h3 className="font-display text-2xl tracking-tight text-ink">{track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{track.description}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-accent underline-offset-4">
                    View track
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Featured courses</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Listings marked coming soon appear here for preview and cannot be purchased until the archive is
            ready.
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
