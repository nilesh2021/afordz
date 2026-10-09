import Link from "next/link";
import Logo from "@/components/Logo";
import { footerLinks, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-surface/75">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-surface">
          <Logo size="sm" onDark />
          <p className="text-sm text-surface/55">© {year} {site.name}</p>
        </div>
        <nav aria-label="Policies" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <a className="hover:text-accent" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
