"use client";

import { Children, useId, useRef, useState } from "react";
import PlaceholderLabel from "@/components/PlaceholderLabel";

export function ProductSpec({ children }) {
  return children;
}

export default function ProductSpecsMenu({
  children,
  compact = false,
  aside = [],
  asideTitle = "Related searches",
}) {
  const items = Children.toArray(children).filter(Boolean);
  const chips = Array.isArray(aside) ? aside : [];
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const uid = useId();

  if (items.length === 0 && chips.length === 0) {
    return null;
  }

  function select(index) {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1);
    }
  }

  const selected = items[active];
  const title = selected?.props?.title;
  const placeholder = selected?.props?.placeholder;
  const showAside = chips.length > 0;

  return (
    <section
      className={`rounded-3xl border border-border bg-surface p-6 ${compact ? "mt-8" : "mt-16"}`}
    >
      <div
        className={
          showAside ? "grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_14rem]" : undefined
        }
      >
        {items.length > 0 ? (
          <div>
            <div
              role="tablist"
              aria-label="Product details"
              className="flex flex-wrap gap-1.5"
              onKeyDown={onKeyDown}
            >
              {items.map((item, index) => {
                const selectedTab = index === active;
                return (
                  <button
                    key={item.props.title}
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    id={`${uid}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selectedTab}
                    aria-controls={`${uid}-panel`}
                    tabIndex={selectedTab ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`rounded-full border px-3 py-1.5 text-left text-xs font-semibold sm:text-sm ${
                      selectedTab
                        ? "border-ink bg-ink text-background"
                        : "border-border bg-background text-ink hover:border-ink/40"
                    }`}
                  >
                    {item.props.title}
                  </button>
                );
              })}
            </div>
            <div
              role="tabpanel"
              id={`${uid}-panel`}
              aria-labelledby={`${uid}-tab-${active}`}
              className="mt-5 space-y-3 text-sm leading-6 text-muted"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">{title}</h2>
                {placeholder ? <PlaceholderLabel /> : null}
              </div>
              {selected}
            </div>
          </div>
        ) : null}

        {showAside ? (
          <aside className="md:border-l md:border-border md:pl-6">
            <h2 className="text-lg font-semibold text-ink">{asideTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {chips.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-ink"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
