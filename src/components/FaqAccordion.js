"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-surface/90 shadow-[0_18px_40px_rgb(22_20_16/0.06)]">
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <div key={item.id} className={index === 0 ? "" : "border-t border-border"}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink sm:px-6"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-xl text-accent-strong"
                >
                  {open ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p className="px-5 pb-5 text-sm leading-6 text-muted sm:px-6">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
