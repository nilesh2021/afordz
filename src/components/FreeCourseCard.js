import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export default function FreeCourseCard({ course }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-accent/40 bg-surface/90 shadow-[0_12px_28px_rgb(22_20_16/0.07)] sm:flex-row sm:rounded-3xl">
      <div className="shrink-0 overflow-hidden rounded-t-2xl bg-gradient-to-br from-violet-300/50 via-fuchsia-200/40 to-cyan-200/55 p-2 sm:w-44 sm:rounded-l-3xl sm:rounded-tr-none sm:p-2.5 lg:w-48">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-white/90 shadow-[0_10px_28px_rgb(109_40_217/0.28)]">
          <Image
            src={course.image.src}
            alt={course.image.alt}
            fill
            sizes="(min-width: 1024px) 12rem, (min-width: 640px) 11rem, 100vw"
            className="object-cover saturate-[1.15]"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-3 sm:px-4 sm:py-3.5">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="w-fit rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
              {course.category}
            </p>
            <p className="w-fit rounded-full bg-accent-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-surface">
              Free course
            </p>
          </div>
          <h3 className="mt-1.5 font-display text-xl leading-snug tracking-tight text-ink sm:mt-2 sm:text-[1.35rem]">
            <Link href={course.href} className="hover:text-accent-strong">
              {course.title}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 max-w-xl text-sm leading-5 text-muted">{course.tagline}</p>
          <p className="mt-2 font-display text-lg tracking-tight text-ink sm:text-xl">Free</p>
        </div>
        <div className="grid gap-2 sm:max-w-sm sm:grid-cols-2">
          <Button href={course.href} variant="primary" className="min-h-10 w-full px-4 py-2 text-sm">
            {course.ctaLabel}
          </Button>
          <Button href={course.href} variant="secondary" className="min-h-10 w-full px-4 py-2 text-sm">
            View syllabus
          </Button>
        </div>
      </div>
    </article>
  );
}
