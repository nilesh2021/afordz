import { formatInr } from "@/data/products";
import { DEFAULT_PURCHASE, DEFAULT_TIER, PURCHASE_OPTIONS, TIER_OPTIONS } from "@/data/catalogue";

function fieldId(prefix, group, value) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${prefix}-${group}-${slug || "item"}`;
}

function Choice({ id, label, checked, onChange }) {
  return (
    <label
      className={`flex min-h-9 cursor-pointer items-center gap-2.5 rounded-xl border px-2.5 py-1.5 text-sm transition ${
        checked
          ? "border-accent/50 bg-accent/15 font-semibold text-ink"
          : "border-transparent text-ink/90 hover:bg-accent/10"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        className="size-4 shrink-0 accent-accent-strong"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="truncate">{label}</span>
    </label>
  );
}

function digitsOnly(value) {
  return value.replace(/\D/g, "").slice(0, 7);
}

function priceHint(options) {
  const rangeNote = "Price range applies only to products with a listed INR price.";
  if (!Number.isFinite(options.priceMin) || !Number.isFinite(options.priceMax)) {
    return `Prices are in Indian rupees. ${rangeNote}`;
  }
  if (options.priceMin === options.priceMax) {
    return `Listed price ${formatInr(options.priceMin)}. ${rangeNote}`;
  }
  return `${formatInr(options.priceMin)}–${formatInr(options.priceMax)}. ${rangeNote}`;
}

export default function FilterFields({
  idPrefix,
  values,
  options,
  onPurchaseChange,
  onTierChange,
  onCategoryChange,
  onMinChange,
  onMaxChange,
}) {
  const hintId = `${idPrefix}-price-hint`;
  const errorId = `${idPrefix}-price-error`;
  const minNumber = values.min === "" ? null : Number(values.min);
  const maxNumber = values.max === "" ? null : Number(values.max);
  const invalid = minNumber != null && maxNumber != null && minNumber > maxNumber;
  const describedBy = [hintId, invalid ? errorId : null].filter(Boolean).join(" ");
  const inputClass =
    "mt-1 w-full min-h-9 rounded-xl border border-border bg-surface px-2.5 text-sm text-ink transition focus:border-accent-strong focus:outline-none";
  const purchase = values.purchase ?? DEFAULT_PURCHASE;
  const tier = values.tier ?? DEFAULT_TIER;

  return (
    <div className="space-y-4">
      <fieldset className="rounded-xl border border-border/80 bg-background/45 p-2.5">
        <legend className="px-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-accent-strong">
          Listing type
        </legend>
        <div className="mt-1 space-y-1">
          {TIER_OPTIONS.map((option) => {
            const active = tier === option.value;
            return (
              <label
                key={option.value}
                className={`flex min-h-9 cursor-pointer items-center gap-2.5 rounded-xl border px-2.5 py-1.5 text-sm transition ${
                  active
                    ? "border-accent/50 bg-accent/15 font-semibold text-ink"
                    : "border-transparent text-ink/90 hover:bg-accent/10"
                }`}
              >
                <input
                  id={fieldId(idPrefix, "tier", option.value)}
                  type="radio"
                  name={`${idPrefix}-tier`}
                  className="size-4 shrink-0 accent-accent-strong"
                  checked={active}
                  onChange={() => onTierChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-border/80 bg-background/45 p-2.5">
        <legend className="px-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-accent-strong">
          Purchase type
        </legend>
        <div className="mt-1 space-y-1">
          {PURCHASE_OPTIONS.map((option) => {
            const active = purchase === option.value;
            return (
              <label
                key={option.value}
                className={`flex min-h-9 cursor-pointer items-center gap-2.5 rounded-xl border px-2.5 py-1.5 text-sm transition ${
                  active
                    ? "border-accent/50 bg-accent/15 font-semibold text-ink"
                    : "border-transparent text-ink/90 hover:bg-accent/10"
                }`}
              >
                <input
                  id={fieldId(idPrefix, "purchase", option.value)}
                  type="radio"
                  name={`${idPrefix}-purchase`}
                  className="size-4 shrink-0 accent-accent-strong"
                  checked={active}
                  onChange={() => onPurchaseChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {options.categories.length > 0 ? (
        <fieldset className="rounded-xl border border-border/80 bg-background/45 p-2.5">
          <legend className="px-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-accent-strong">
            Category
          </legend>
          <div className="mt-1 space-y-1">
            {options.categories.map((category) => (
              <Choice
                key={category}
                id={fieldId(idPrefix, "category", category)}
                label={category}
                checked={values.categories.includes(category)}
                onChange={(checked) => onCategoryChange(category, checked)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="rounded-xl border border-border/80 bg-background/45 p-2.5">
        <legend className="px-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-accent-strong">
          Price (INR)
        </legend>
        <p id={hintId} className="mt-1 px-1.5 text-xs leading-5 text-muted">
          {priceHint(options)}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 px-1">
          <label htmlFor={`${idPrefix}-min`} className="block text-xs font-semibold text-ink">
            Minimum
            <input
              id={`${idPrefix}-min`}
              inputMode="numeric"
              autoComplete="off"
              placeholder="₹0"
              value={values.min}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(event) => onMinChange(digitsOnly(event.target.value))}
              className={inputClass}
            />
          </label>
          <label htmlFor={`${idPrefix}-max`} className="block text-xs font-semibold text-ink">
            Maximum
            <input
              id={`${idPrefix}-max`}
              inputMode="numeric"
              autoComplete="off"
              placeholder="Any"
              value={values.max}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(event) => onMaxChange(digitsOnly(event.target.value))}
              className={inputClass}
            />
          </label>
        </div>
        {invalid ? (
          <p id={errorId} role="alert" className="mt-3 px-1.5 text-xs font-semibold text-rose-800">
            Minimum price is higher than the maximum price.
          </p>
        ) : null}
      </fieldset>
    </div>
  );
}
