import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-indigo-800">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="font-medium text-zinc-400" aria-hidden="true">
                  /
                </span>
              ) : null}
              {last || !item.path ? (
                <span className={last ? "text-zinc-700" : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-indigo-950">
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
