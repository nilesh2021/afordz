"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";
import Logo from "@/components/Logo";
import { useCart } from "@/components/CartProvider";

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;

  function closeMenu() {
    setOpenPath(null);
  }

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const cartLabel = ready
    ? `Cart, ${count} ${count === 1 ? "item" : "items"}`
    : "Cart";

  function isCurrent(href) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="px-3 pt-3 sm:px-6">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-[1.75rem] border border-accent/35 bg-surface/75 px-3 shadow-[0_12px_40px_rgb(22_20_16/0.08)] backdrop-blur-xl md:rounded-full md:px-5">
          <Link href="/" aria-label={`${site.name}, ${site.tagline}`} className="text-ink">
            <Logo size="sm" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const current = isCurrent(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={
                    current
                      ? "rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-surface"
                      : "rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-accent/15 hover:text-ink"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              aria-label={cartLabel}
              onClick={closeMenu}
              className="relative inline-flex size-11 items-center justify-center rounded-full border border-accent/40 bg-surface text-ink hover:border-accent-strong"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6.5 8h11l-.8 11H7.3L6.5 8z" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
              </svg>
              {ready && count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-strong px-1 text-xs font-semibold text-surface">
                  {count}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-accent/40 bg-surface text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="px-3 pt-2 md:hidden">
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 rounded-[1.5rem] border border-accent/35 bg-surface/92 p-2 shadow-[0_16px_40px_rgb(22_20_16/0.1)] backdrop-blur-xl"
          aria-label="Mobile"
        >
          {navLinks.map((link) => {
            const current = isCurrent(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                onClick={closeMenu}
                className={
                  current
                    ? "rounded-2xl bg-accent-strong px-4 py-3 text-base font-semibold text-surface"
                    : "rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-accent/15"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
