"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function groupModulesByPhase(modules) {
  const groups = [];
  const indexByPhase = new Map();

  modules.forEach((module, moduleIndex) => {
    const phase = module.phase || "Course";
    if (!indexByPhase.has(phase)) {
      indexByPhase.set(phase, groups.length);
      groups.push({ phase, modules: [] });
    }
    groups[indexByPhase.get(phase)].modules.push({ module, moduleIndex });
  });

  return groups;
}

function firstLessonHref(module, trackSlug) {
  const lesson = (module.lessons ?? []).find((item) => item.content);
  if (!lesson || !trackSlug) return null;
  return `/training/${trackSlug}/${lesson.slug}`;
}

export default function CourseSyllabus({ modules, trackSlug }) {
  const groups = useMemo(() => groupModulesByPhase(modules), [modules]);
  const [openId, setOpenId] = useState(modules[0]?.id ?? null);

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.phase} id={`syllabus-${group.phase.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
          <div className="mb-3 flex items-center gap-3">
            <p className="inline-flex rounded-full bg-accent-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-surface">
              {group.phase}
            </p>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <p className="text-xs text-muted">
              {group.modules.length} {group.modules.length === 1 ? "module" : "modules"}
            </p>
          </div>

          <ol className="space-y-3">
            {group.modules.map(({ module, moduleIndex }) => {
              const open = openId === module.id;
              const panelId = `syllabus-panel-${module.id}`;
              const buttonId = `syllabus-button-${module.id}`;
              const lessons = module.lessons ?? [];
              const lessonCount = lessons.length;
              const publishedCount = lessons.filter((lesson) => lesson.content).length;
              const startHref = firstLessonHref(module, trackSlug);

              return (
                <li
                  key={module.id}
                  className="overflow-hidden rounded-[1.75rem] border border-accent/35 bg-surface/95 shadow-[0_12px_32px_rgb(109_40_217/0.06)]"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition hover:bg-accent/10 sm:px-5"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : module.id)}
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent/25 text-xs font-semibold text-accent-strong">
                            {String(moduleIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-strong">
                            {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                            {module.duration ? ` · ${module.duration}` : ""}
                          </span>
                        </span>
                        <span className="mt-2 block font-display text-xl tracking-tight text-ink sm:text-2xl">
                          {module.title}
                        </span>
                        {module.summary ? (
                          <span className="mt-2 block max-w-2xl text-sm leading-6 text-muted">{module.summary}</span>
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-display text-lg leading-none text-accent-strong"
                      >
                        {open ? "–" : "+"}
                      </span>
                    </button>
                  </h3>

                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                    <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3 sm:px-5">
                      <p className="text-xs text-muted">
                        {publishedCount} of {lessonCount} lessons ready to read
                      </p>
                      {startHref ? (
                        <Link
                          href={startHref}
                          className="inline-flex rounded-full bg-accent-strong px-3.5 py-1.5 text-xs font-semibold text-surface hover:opacity-95"
                        >
                          Start module
                        </Link>
                      ) : null}
                    </div>

                    <ol className="divide-y divide-border border-t border-border">
                      {lessons.map((lesson, lessonIndex) => {
                        const href = lesson.content && trackSlug ? `/training/${trackSlug}/${lesson.slug}` : null;

                        return (
                          <li key={lesson.slug} className="flex gap-3 px-4 py-3.5 sm:px-5">
                            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-[11px] font-semibold text-accent-strong">
                              {moduleIndex + 1}.{lessonIndex + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                {href ? (
                                  <Link
                                    href={href}
                                    className="text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong"
                                  >
                                    {lesson.title}
                                  </Link>
                                ) : (
                                  <span className="text-sm font-semibold text-muted">{lesson.title}</span>
                                )}
                                {lesson.duration ? <span className="text-xs text-muted">{lesson.duration}</span> : null}
                              </span>
                              {lesson.summary ? (
                                <span className="mt-1 block text-sm leading-6 text-muted">{lesson.summary}</span>
                              ) : null}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
