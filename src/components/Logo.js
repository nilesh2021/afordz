import { site } from "@/data/site";

export function LogoMark({ className = "size-9" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-indigo-700 text-white shadow-[0_8px_18px_rgb(67_56_202/0.35)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="size-[68%]" fill="none">
        <path fill="currentColor" d="M9.6 7.2 15.6 25.2H12.8l-1-2.9H7.15l-1 2.9H3.35L9.35 7.2H9.6Z" />
        <path fill="#4338ca" d="M9.5 14.4 8.15 18.5h2.7L9.5 14.4Z" />
        <path
          d="M18.4 8.6h8.4M18.4 12.4h8.4M25.6 8.6v4.6c0 3.5-2.2 5.8-5.6 5.8h-.6l7.2 6.6"
          stroke="currentColor"
          strokeWidth="2.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Logo({ size = "sm" }) {
  const compact = size === "sm";

  return (
    <span className="flex items-center gap-2.5 text-zinc-950">
      <LogoMark className={compact ? "size-9" : "size-10"} />
      <span className="flex min-w-0 flex-col">
        <span
          className={`font-display leading-none tracking-tight ${compact ? "text-2xl" : "text-xl"}`}
        >
          {site.name}
        </span>
        {compact ? null : (
          <span className="mt-1 text-xs leading-none text-zinc-600">{site.tagline}</span>
        )}
      </span>
    </span>
  );
}
