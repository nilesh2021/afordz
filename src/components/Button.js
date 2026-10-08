import Link from "next/link";

const variants = {
  primary:
    "bg-indigo-700 text-white shadow-[0_12px_28px_rgb(67_56_202/0.32)] hover:bg-indigo-800",
  secondary:
    "border border-indigo-200/80 bg-white/80 text-zinc-950 backdrop-blur hover:border-indigo-700 hover:text-indigo-900",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-2.5 text-center text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant] ?? variants.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
