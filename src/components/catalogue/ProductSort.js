import { SORT_OPTIONS } from "@/data/catalogue";

export default function ProductSort({ value, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      <label htmlFor="catalogue-sort" className="shrink-0 text-sm text-zinc-500">
        Sort by
      </label>
      <select
        id="catalogue-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-10 min-w-44 appearance-none rounded-lg border border-zinc-200 bg-white bg-[length:0.7rem] bg-[right_0.7rem_center] bg-no-repeat py-2 pl-3 pr-8 text-sm text-zinc-800"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%2371717a' stroke-width='1.4' d='M1 1.5l5 5 5-5'/></svg>\")",
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
