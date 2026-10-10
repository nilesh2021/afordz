import { formatInr } from "@/data/products";
import { DEFAULT_PURCHASE, purchaseLabel } from "@/data/catalogue";

function Chip({ children, onRemove, label }) {
  return (
    <li>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 text-sm font-medium text-ink"
      >
        <span className="truncate">{children}</span>
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

export default function AppliedFilters({ query, onChange }) {
  const formats = query.formats ?? [];
  const purchaseChip = query.purchase && query.purchase !== DEFAULT_PURCHASE;
  const hasChips =
    purchaseChip ||
    query.categories.length > 0 ||
    formats.length > 0 ||
    query.frameworks.length > 0 ||
    query.min !== "" ||
    query.max !== "";

  if (!hasChips) {
    return null;
  }

  return (
    <ul aria-label="Active filters" className="mt-3 flex flex-wrap gap-2">
      {purchaseChip ? (
        <Chip
          label={`purchase type ${purchaseLabel(query.purchase)}`}
          onRemove={() => onChange({ ...query, purchase: DEFAULT_PURCHASE })}
        >
          {purchaseLabel(query.purchase)}
        </Chip>
      ) : null}
      {query.categories.map((category) => (
        <Chip
          key={`category-${category}`}
          label={`category ${category}`}
          onRemove={() =>
            onChange({
              ...query,
              categories: query.categories.filter((item) => item !== category),
            })
          }
        >
          {category}
        </Chip>
      ))}
      {formats.map((format) => (
        <Chip
          key={`format-${format}`}
          label={`format ${format}`}
          onRemove={() =>
            onChange({
              ...query,
              formats: formats.filter((item) => item !== format),
            })
          }
        >
          {format}
        </Chip>
      ))}
      {query.frameworks.map((framework) => (
        <Chip
          key={`framework-${framework}`}
          label={`compatible tool ${framework}`}
          onRemove={() =>
            onChange({
              ...query,
              frameworks: query.frameworks.filter((item) => item !== framework),
            })
          }
        >
          {framework}
        </Chip>
      ))}
      {query.min !== "" ? (
        <Chip label={`minimum price ${formatInr(Number(query.min))}`} onRemove={() => onChange({ ...query, min: "" })}>
          Min {formatInr(Number(query.min))}
        </Chip>
      ) : null}
      {query.max !== "" ? (
        <Chip label={`maximum price ${formatInr(Number(query.max))}`} onRemove={() => onChange({ ...query, max: "" })}>
          Max {formatInr(Number(query.max))}
        </Chip>
      ) : null}
    </ul>
  );
}
