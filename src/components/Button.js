import Link from "next/link";

const variants = {
  primary:
    "bg-accent-strong text-surface shadow-[0_12px_28px_rgb(109_40_217/0.35)] hover:bg-[#5b21b6] active:bg-[#4c1d95]",
  secondary:
    "border border-accent-strong/40 bg-surface/90 text-accent-strong backdrop-blur hover:border-accent-strong hover:bg-accent/15 hover:text-ink",
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
