"use client";

import { useRef, useState } from "react";
import TemplateMockup from "@/components/TemplateMockup";

export default function PreviewGallery({ images, note }) {
  const [activeId, setActiveId] = useState(images[0]?.id ?? "");
  const tabs = useRef({});
  const active = images.find((image) => image.id === activeId) ?? images[0];

  if (!active) {
    return null;
  }

  function selectRelative(offset) {
    const index = images.findIndex((image) => image.id === active.id);
    const next = images[(index + offset + images.length) % images.length];
    setActiveId(next.id);
    tabs.current[next.id]?.focus();
  }

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectRelative(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectRelative(-1);
    }
  }

  const previewNote =
    note ||
    "These previews are original CSS mockups. They are not screenshots of the downloadable files.";

  return (
    <div id="gallery">
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="rounded-2xl bg-zinc-50 p-2 sm:p-3"
      >
        <TemplateMockup
          variant={active.variant}
          src={active.src}
          alt={active.alt}
          eager
          sizes="(min-width: 1024px) 560px, 100vw"
        />
        <p className="mt-2 text-sm font-medium text-zinc-800">{active.label}</p>
        {active.summary ? (
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-zinc-600">{active.summary}</p>
        ) : null}
      </div>

      <div
        role="tablist"
        aria-label="Product previews"
        className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-4"
        onKeyDown={onKeyDown}
      >
        {images.map((image) => {
          const selected = image.id === active.id;
          return (
            <button
              key={image.id}
              ref={(node) => {
                tabs.current[image.id] = node;
              }}
              id={`tab-${image.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${image.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(image.id)}
              className={`rounded-xl p-1 text-left ${
                selected ? "ring-2 ring-indigo-700 ring-offset-1" : "hover:bg-zinc-50"
              }`}
            >
              <TemplateMockup
                variant={image.variant}
                src={image.src}
                alt=""
                sizes="(min-width: 640px) 10rem, 30vw"
              />
              <span className="mt-1 block truncate text-xs font-medium text-zinc-800">
                {image.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs leading-5 text-zinc-600">{previewNote}</p>
    </div>
  );
}
