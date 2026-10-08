"use client";

import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/Button";
import FilterFields from "@/components/catalogue/FilterFields";
import { countActiveFilters, filterProducts, productCountLabel } from "@/data/catalogue";
import { getVisibleProducts } from "@/data/products";

function emptyDraft() {
  return {
    purchase: "",
    categories: [],
    formats: [],
    frameworks: [],
    min: "",
    max: "",
  };
}

function draftFromQuery(query) {
  return {
    purchase: query.purchase ?? "",
    categories: [...query.categories],
    formats: [...(query.formats ?? [])],
    frameworks: [...query.frameworks],
    min: query.min,
    max: query.max,
  };
}

export default function FilterDrawer({ query, options, onApply }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => draftFromQuery(query));
  const activeCount = countActiveFilters(query);
  const matchCount = filterProducts(getVisibleProducts(), { ...query, ...draft }).length;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      if (media.matches) {
        dialogRef.current?.close();
      }
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function openDrawer() {
    setDraft(draftFromQuery(query));
    setOpen(true);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }

  function closeDrawer() {
    dialogRef.current?.close();
  }

  function clearDraft() {
    setDraft(emptyDraft());
  }

  function applyDraft(event) {
    event.preventDefault();
    onApply(draft);
    closeDrawer();
  }

  function setPurchase(purchase) {
    setDraft((current) => ({ ...current, purchase }));
  }

  function setCategory(category, checked) {
    setDraft((current) => ({
      ...current,
      categories: checked
        ? [...current.categories.filter((item) => item !== category), category]
        : current.categories.filter((item) => item !== category),
    }));
  }

  function setFormat(format, checked) {
    setDraft((current) => ({
      ...current,
      formats: checked
        ? [...current.formats.filter((item) => item !== format), format]
        : current.formats.filter((item) => item !== format),
    }));
  }

  function setFramework(framework, checked) {
    setDraft((current) => ({
      ...current,
      frameworks: checked
        ? [...current.frameworks.filter((item) => item !== framework), framework]
        : current.frameworks.filter((item) => item !== framework),
    }));
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-indigo-700 px-5 text-sm font-semibold text-white hover:bg-indigo-800 lg:hidden"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={openDrawer}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        Filters
        {activeCount > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-indigo-800">
            {activeCount}
            <span className="sr-only"> active</span>
          </span>
        ) : null}
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className="filter-drawer"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => setOpen(false)}
      >
        <div className="flex h-full w-full flex-row-reverse">
          <form className="flex h-full w-full max-w-sm shrink-0 flex-col bg-white shadow-2xl" onSubmit={applyDraft}>
            <div className="flex items-start justify-between gap-3 border-b border-indigo-50 bg-indigo-50/80 px-5 py-4">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-indigo-950">
                  Filters
                </h2>
                <p id={descriptionId} className="mt-1 text-sm leading-6 text-zinc-600">
                  Apply updates the catalogue. Clear removes the choices in this panel.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-950"
                onClick={closeDrawer}
              >
                <span className="sr-only">Close filters</span>
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <FilterFields
                idPrefix="drawer-filters"
                values={draft}
                options={options}
                onPurchaseChange={setPurchase}
                onCategoryChange={setCategory}
                onFormatChange={setFormat}
                onFrameworkChange={setFramework}
                onMinChange={(min) => setDraft((current) => ({ ...current, min }))}
                onMaxChange={(max) => setDraft((current) => ({ ...current, max }))}
              />
            </div>

            <div className="shrink-0 border-t border-indigo-50 bg-indigo-50/50 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="mb-3 text-sm font-medium text-zinc-700" aria-live="polite">
                {productCountLabel(matchCount)} match{matchCount === 1 ? "es" : ""} these filters.
              </p>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={clearDraft}>
                  Clear
                </Button>
                <Button type="submit" className="flex-1">
                  Apply
                </Button>
              </div>
            </div>
          </form>
          <button
            type="button"
            className="min-w-0 flex-1"
            aria-label="Close filters"
            tabIndex={-1}
            onClick={closeDrawer}
          />
        </div>
      </dialog>
    </>
  );
}
