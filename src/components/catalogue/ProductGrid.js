import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products, totalCount, priceInvalid, onReset }) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-indigo-200 bg-white px-6 py-10">
        <p className="text-lg font-semibold text-zinc-950">
          {totalCount === 0 ? "No products yet" : "No matching products"}
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
          {totalCount === 0
            ? "Products added to the catalogue data file will show up here."
            : priceInvalid
              ? "The minimum price is higher than the maximum price. Reset the filters to see every product."
              : "Nothing in the catalogue matches these filters. Reset them to see every product."}
        </p>
        {totalCount > 0 ? (
          <Button type="button" onClick={onReset} className="mt-6">
            Reset filters
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <ul className="catalogue-grid">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
