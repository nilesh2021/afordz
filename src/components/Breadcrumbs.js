import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-accent-strong">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="font-medium text-muted/70" aria-hidden="true">
                  /
                </span>
              ) : null}
              {last || !item.path ? (
                <span className={last ? "text-ink/80" : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-ink">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
