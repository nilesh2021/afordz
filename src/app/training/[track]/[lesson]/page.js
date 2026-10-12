import { notFound } from "next/navigation";
import CourseLesson from "@/components/CourseLesson";
import {
  getAdjacentLessons,
  getLearningTrackBySlug,
  getLessonBySlug,
  getPublishedLessonParams,
  isFreeOnSiteCourse,
} from "@/data/training";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPublishedLessonParams();
}

export async function generateMetadata({ params }) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  const track = getLearningTrackBySlug(trackSlug);
  if (!isFreeOnSiteCourse(track)) {
    return { title: "Lesson" };
  }
  const lesson = getLessonBySlug(track.course, lessonSlug);
  if (!lesson) {
    return { title: "Lesson" };
  }

  const lede = lesson.content?.lede || lesson.summary || "";
  return pageMetadata({
    title: `${lesson.title} | Free UI UX Design Course`,
    description: `${lede} Part of Afordz’s free UI UX design course.`,
    path: `/training/${track.slug}/${lesson.slug}`,
    keywords: track.course.keywords,
  });
}

export default async function CourseLessonPage({ params }) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  const track = getLearningTrackBySlug(trackSlug);
  if (!isFreeOnSiteCourse(track)) {
    notFound();
  }

  const lesson = getLessonBySlug(track.course, lessonSlug);
  if (!lesson) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(track.course, lesson.slug);

  return <CourseLesson track={track} lesson={lesson} prev={prev} next={next} />;
}
