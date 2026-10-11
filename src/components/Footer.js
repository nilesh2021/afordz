import Link from "next/link";
import Logo from "@/components/Logo";
import NewsletterSignup from "@/components/NewsletterSignup";
import { footerLinks, navLinks, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-ink text-surface/75">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgb(167_139_250/0.22),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_100%,rgb(109_40_217/0.18),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="space-y-4">
            <Logo size="sm" onDark />
            <p className="max-w-xs font-display text-2xl leading-snug tracking-tight text-surface">
              {site.tagline}
            </p>
            <p className="max-w-sm text-sm leading-6 text-surface/55">
              Digital finds priced in INR. Browse the catalogue, pay with Razorpay, and get what the listing includes.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-surface"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:max-w-sm lg:max-w-none">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Explore</p>
              <nav aria-label="Footer explore" className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-surface/70 transition hover:text-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Policies</p>
              <nav aria-label="Footer policies" className="mt-4 flex flex-col gap-2.5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-surface/70 transition hover:text-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <NewsletterSignup source="footer" variant="footer" />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-surface/45">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-surface/40">Smart finds. Great value.</p>
        </div>
      </div>
    </footer>
  );
}
