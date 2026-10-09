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
    <aside className="rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <h2 className="text-base font-semibold text-ink">Filters</h2>
        <button
          type="button"
          onClick={handleClear}
          disabled={!canClear}
          className="inline-flex min-h-9 items-center text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:decoration-accent-strong disabled:cursor-not-allowed disabled:text-muted/60 disabled:no-underline"
        >
          Clear all
        </button>
      </div>
      <div className="p-3">
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
