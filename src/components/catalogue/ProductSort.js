import { SORT_OPTIONS } from "@/data/catalogue";

export default function ProductSort({ value, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      <label htmlFor="catalogue-sort" className="shrink-0 text-xs font-semibold uppercase tracking-[0.13em] text-muted">
        Sort by
      </label>
      <select
        id="catalogue-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-9 min-w-44 cursor-pointer appearance-none rounded-xl border border-accent/35 bg-background/60 bg-[length:0.7rem] bg-[right_0.75rem_center] bg-no-repeat py-1.5 pl-3 pr-8 text-sm font-medium text-ink transition hover:border-accent-strong focus:border-accent-strong"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%236d28d9' stroke-width='1.5' d='M1 1.5l5 5 5-5'/></svg>\")",
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
