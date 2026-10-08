"use client";

import { useEffect, useState } from "react";
import FilterFields from "@/components/catalogue/FilterFields";
import { hasActiveFilters } from "@/data/catalogue";

export default function FilterPanel({
  values,
  options,
  onPurchaseChange,
  onCategoryChange,
  onFormatChange,
  onFrameworkChange,
  onPriceCommit,
  onClear,
}) {
  const [min, setMin] = useState(values.min);
  const [max, setMax] = useState(values.max);
  const committed = `${values.min}\n${values.max}`;
  const [seen, setSeen] = useState(committed);

  if (committed !== seen) {
    setSeen(committed);
    setMin(values.min);
    setMax(values.max);
  }

  useEffect(() => {
    if (min === values.min && max === values.max) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      onPriceCommit(min, max);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [min, max, values.min, values.max, onPriceCommit]);

  const canClear = hasActiveFilters(values) || min !== values.min || max !== values.max;

  function handleClear() {
    setMin("");
    setMax("");
    onClear();
  }

  return (
    <aside className="rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_18px_40px_rgb(20_18_28/0.07)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 rounded-t-[2rem] border-b border-indigo-50 bg-indigo-50/70 px-4 py-3">
        <h2 className="text-base font-semibold text-indigo-950">Filters</h2>
        <button
          type="button"
          onClick={handleClear}
          disabled={!canClear}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-800 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:no-underline"
        >
          Clear all
        </button>
      </div>
      <div className="p-4">
        <FilterFields
          idPrefix="desktop-filters"
          values={{ ...values, min, max }}
          options={options}
          onPurchaseChange={onPurchaseChange}
          onCategoryChange={onCategoryChange}
          onFormatChange={onFormatChange}
          onFrameworkChange={onFrameworkChange}
          onMinChange={setMin}
          onMaxChange={setMax}
        />
      </div>
    </aside>
  );
}
