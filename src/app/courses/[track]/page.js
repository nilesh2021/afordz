import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import TrainingCourseCard from "@/components/TrainingCourseCard";
import TrainingFreeCourse from "@/components/TrainingFreeCourse";
import { getProductsByTrack } from "@/data/products";
import { getCourseLessonCount, getLearningTrackBySlug, isFreeOnSiteCourse, LEARNING_TRACKS } from "@/data/training";
import { requiresFreeCourseEmailGate } from "@/lib/free-course-access";
import { hasFreeCourseAccess } from "@/lib/free-course-server";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LEARNING_TRACKS.map((track) => ({ track: track.slug }));
}

export async function generateMetadata({ params }) {
  const { track: trackSlug } = await params;
  const track = getLearningTrackBySlug(trackSlug);
  if (!track) {
    return { title: "Courses" };
  }

  if (isFreeOnSiteCourse(track)) {
    const course = track.course;
    const lessonCount = getCourseLessonCount(course);
    return pageMetadata({
      title: {
        absolute: `Free UI UX Design Course — ${course.title} | Afordz`,
      },
      description: `Free UI UX design course for beginners. Self-paced ${course.title}: ${lessonCount} lessons covering Figma, Jakob Nielsen heuristics, and the design process. No payment required.`,
      path: `/courses/${track.slug}`,
      keywords: course.keywords,
    });
  }

  return pageMetadata({
    title: `${track.title} courses`,
    description: `${track.description} Browse Afordz course packs in this track, then buy a digital download in INR when a listing is live.`,
    path: `/courses/${track.slug}`,
  });
}

export default async function CourseTrackPage({ params }) {
  const { track: trackSlug } = await params;
  const track = getLearningTrackBySlug(trackSlug);
  if (!track) {
    notFound();
  }

  if (isFreeOnSiteCourse(track)) {
    const unlocked = requiresFreeCourseEmailGate(track)
      ? await hasFreeCourseAccess(track.slug)
      : true;
    return <TrainingFreeCourse track={track} unlocked={unlocked} />;
  }

  const courses = getProductsByTrack(track.id);

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          <Link href="/courses" className="hover:text-ink">
            Courses
          </Link>
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-balance text-ink sm:text-6xl">
          {track.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{track.description}</p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          <span className="font-semibold text-ink">Who it suits: </span>
          {track.audience}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/courses" variant="secondary">
            All tracks
          </Button>
          <Button href="/shop?category=Training" variant="secondary">
            Courses in the shop
          </Button>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-3xl tracking-tight text-ink">Courses in this track</h2>
          {courses.length > 0 ? (
            <ul className="mt-8 space-y-6">
              {courses.map((product) => (
                <li key={product.id}>
                  <TrainingCourseCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-[1.75rem] border border-border bg-surface/90 p-6 text-base leading-7 text-muted">
              No courses in this track yet. See other paths on the{" "}
              <Link
                href="/courses"
                className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
              >
                Courses hub
              </Link>
              .
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
