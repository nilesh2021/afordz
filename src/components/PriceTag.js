import { formatInr } from "@/data/products";
import PlaceholderLabel from "@/components/PlaceholderLabel";

export default function PriceTag({ amount, placeholder = false, size = "md", term = "" }) {
  const amountClass =
    size === "lg"
      ? "text-4xl font-semibold tracking-tight text-ink"
      : "text-2xl font-semibold tracking-tight text-ink";

  return (
    <div>
      <p className={amountClass}>
        {formatInr(amount)}
        {term ? (
          <span className="ml-2 text-lg font-medium tracking-normal text-muted">for {term}</span>
        ) : null}
      </p>
      {placeholder ? (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-amber-950">
          <PlaceholderLabel />
          <span>Confirm this INR amount before accepting orders.</span>
        </p>
      ) : null}
    </div>
  );
}
