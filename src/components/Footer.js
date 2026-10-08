import Link from "next/link";
import Logo from "@/components/Logo";
import { footerLinks, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white text-zinc-600">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-2">
          <Logo size="md" />
          <p className="text-sm text-zinc-400">{year}</p>
        </div>
        <nav aria-label="Policies" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <a className="hover:text-indigo-800" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-indigo-800">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
