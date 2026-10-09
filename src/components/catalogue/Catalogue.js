"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppliedFilters from "@/components/catalogue/AppliedFilters";
import FilterDrawer from "@/components/catalogue/FilterDrawer";
import FilterPanel from "@/components/catalogue/FilterPanel";
import ProductGrid from "@/components/catalogue/ProductGrid";
import ProductSort from "@/components/catalogue/ProductSort";
import {
  emptyFilters,
  filterProducts,
  getFilterOptions,
  isPriceRangeInvalid,
  productCountLabel,
  resetCatalogueQuery,
  serializeCatalogueQuery,
  sortProducts,
} from "@/data/catalogue";
import { getVisibleProducts } from "@/data/products";

function withValue(list, value, checked) {
  if (checked) {
    return list.includes(value) ? list : [...list, value];
  }
  return list.filter((item) => item !== value);
}

export default function Catalogue({ initialQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const signature = serializeCatalogueQuery(initialQuery).toString();
  const [seen, setSeen] = useState(signature);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  if (signature !== seen) {
    setSeen(signature);
    const localSignature = serializeCatalogueQuery(query).toString();
    if (signature !== localSignature) {
      setQuery(initialQuery);
    }
  }

  const products = getVisibleProducts();
  const options = getFilterOptions(products);
  const results = sortProducts(filterProducts(products, query), query.sort);

  const commit = useCallback(
    (next) => {
      setQuery(next);
      const nextQuery = serializeCatalogueQuery(next).toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const onPriceCommit = useCallback(
    (min, max) => {
      commit({ ...queryRef.current, min, max });
    },
    [commit],
  );

  function commitFilters(filters) {
    commit({ ...queryRef.current, ...filters });
  }

  return (
    <section id="shop" aria-labelledby="catalogue-heading" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h2 id="catalogue-heading" className="sr-only">
        Product catalogue
      </h2>
      <div className="grid items-start gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="hidden lg:sticky lg:top-24 lg:block">
          <FilterPanel
            values={query}
            options={options}
            onPurchaseChange={(purchase) => commit({ ...query, purchase })}
            onCategoryChange={(category, checked) =>
              commit({
                ...query,
                categories: withValue(query.categories, category, checked),
              })
            }
            onFormatChange={(format, checked) =>
              commit({
                ...query,
                formats: withValue(query.formats ?? [], format, checked),
              })
            }
            onFrameworkChange={(framework, checked) =>
              commit({
                ...query,
                frameworks: withValue(query.frameworks, framework, checked),
              })
            }
            onPriceCommit={onPriceCommit}
            onClear={() => commit(emptyFilters(queryRef.current))}
          />
        </div>

        <div className="min-w-0">
          <FilterDrawer query={query} options={options} onApply={commitFilters} />

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-0">
            <p className="text-sm font-semibold text-indigo-950" aria-live="polite" aria-atomic="true">
              {productCountLabel(results.length)}
              {results.length === 0 && products.length > 0 ? (
                <span className="sr-only">. Nothing matches these filters.</span>
              ) : null}
            </p>
            <ProductSort value={query.sort} onChange={(sort) => commit({ ...query, sort })} />
          </div>

          <AppliedFilters query={query} onChange={commit} />

          <div className="mt-5 rounded-[2rem] bg-linear-to-br from-emerald-50/90 via-white/40 to-violet-50 p-4 shadow-[0_16px_40px_rgb(16_185_129/0.08)] sm:p-6">
            <ProductGrid
              products={results}
              totalCount={products.length}
              priceInvalid={isPriceRangeInvalid(query)}
              onReset={() => commit(resetCatalogueQuery(queryRef.current))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
