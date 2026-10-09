import { formatInr } from "@/data/products";
import { PURCHASE_OPTIONS } from "@/data/catalogue";

function fieldId(prefix, group, value) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${prefix}-${group}-${slug || "item"}`;
}

function Choice({ id, label, checked, onChange }) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-1.5 text-sm text-zinc-800 hover:bg-violet-50">
      <input
        id={id}
        type="checkbox"
        className="size-4 shrink-0 accent-indigo-700"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
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
  onCategoryChange,
  onFormatChange,
  onFrameworkChange,
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
    "mt-1 w-full min-h-9 rounded-lg border border-indigo-100 bg-white px-2.5 text-sm text-zinc-950";
  const formats = options.formats ?? [];
  const selectedFormats = values.formats ?? [];
  const purchase = values.purchase ?? "";

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="px-1.5 text-sm font-semibold text-zinc-950">Purchase type</legend>
        <div className="mt-1">
          {PURCHASE_OPTIONS.map((option) => (
            <label
              key={option.value || "all"}
              className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-1.5 text-sm text-zinc-800 hover:bg-violet-50"
            >
              <input
                id={fieldId(idPrefix, "purchase", option.value || "all")}
                type="radio"
                name={`${idPrefix}-purchase`}
                className="size-4 shrink-0 accent-indigo-700"
                checked={purchase === option.value}
                onChange={() => onPurchaseChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {options.categories.length > 0 ? (
        <fieldset>
          <legend className="px-1.5 text-sm font-semibold text-zinc-950">Category</legend>
          <div className="mt-1">
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

      {formats.length > 0 ? (
        <fieldset>
          <legend className="px-1.5 text-sm font-semibold text-zinc-950">Format</legend>
          <div className="mt-1">
            {formats.map((format) => (
              <Choice
                key={format}
                id={fieldId(idPrefix, "format", format)}
                label={format}
                checked={selectedFormats.includes(format)}
                onChange={(checked) => onFormatChange(format, checked)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      {options.frameworks.length > 0 ? (
        <fieldset>
          <legend className="px-1.5 text-sm font-semibold text-zinc-950">Compatible tool</legend>
          <div className="mt-1">
            {options.frameworks.map((framework) => (
              <Choice
                key={framework}
                id={fieldId(idPrefix, "framework", framework)}
                label={framework}
                checked={values.frameworks.includes(framework)}
                onChange={(checked) => onFrameworkChange(framework, checked)}
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="px-1.5 text-sm font-semibold text-zinc-950">Price (INR)</legend>
        <p id={hintId} className="mt-1 px-1.5 text-xs leading-5 text-zinc-600">
          {priceHint(options)}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 px-1.5">
          <label htmlFor={`${idPrefix}-min`} className="block text-sm font-medium text-zinc-800">
            Minimum
            <input
              id={`${idPrefix}-min`}
              inputMode="numeric"
              autoComplete="off"
              value={values.min}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(event) => onMinChange(digitsOnly(event.target.value))}
              className={inputClass}
            />
          </label>
          <label htmlFor={`${idPrefix}-max`} className="block text-sm font-medium text-zinc-800">
            Maximum
            <input
              id={`${idPrefix}-max`}
              inputMode="numeric"
              autoComplete="off"
              value={values.max}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(event) => onMaxChange(digitsOnly(event.target.value))}
              className={inputClass}
            />
          </label>
        </div>
        {invalid ? (
          <p id={errorId} role="alert" className="mt-3 px-2 text-sm font-medium text-rose-800">
            Minimum price is higher than the maximum price.
          </p>
        ) : null}
      </fieldset>
    </div>
  );
}
