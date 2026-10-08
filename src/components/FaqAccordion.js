"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_18px_40px_rgb(20_18_28/0.06)]">
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <div key={item.id} className={index === 0 ? "" : "border-t border-indigo-50"}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-zinc-950 sm:px-6"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-display text-xl text-indigo-700"
                >
                  {open ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p className="px-5 pb-5 text-sm leading-6 text-zinc-600 sm:px-6">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
