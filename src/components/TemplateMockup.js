import Image from "next/image";

function BusinessLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="h-2 w-12 rounded-full bg-ink" />
        <div className="flex gap-1.5">
          <div className="h-2 w-6 rounded-full bg-zinc-200" />
          <div className="h-2 w-6 rounded-full bg-zinc-200" />
          <div className="h-2 w-6 rounded-full bg-zinc-200" />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center rounded-xl bg-ink px-4">
        <div className="h-2.5 w-2/3 rounded-full bg-white" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-accent" />
        <div className="mt-4 h-6 w-20 rounded-full bg-white" />
      </div>
      <div className="grid h-[26%] grid-cols-3 gap-2">
        <div className="rounded-lg bg-background" />
        <div className="rounded-lg bg-background" />
        <div className="rounded-lg bg-background" />
      </div>
    </div>
  );
}

function PortfolioLayout() {
  return (
    <div className="grid h-full grid-cols-[0.35fr_1fr] gap-2">
      <div className="flex flex-col gap-2 rounded-xl bg-zinc-900 p-2">
        <div className="h-2 w-8 rounded-full bg-amber-200" />
        <div className="h-2 w-full rounded-full bg-zinc-700" />
        <div className="h-2 w-4/5 rounded-full bg-zinc-700" />
        <div className="h-2 w-3/5 rounded-full bg-zinc-700" />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <div className="rounded-lg bg-amber-100" />
        <div className="rounded-lg bg-zinc-200" />
        <div className="rounded-lg bg-zinc-100" />
        <div className="rounded-lg bg-amber-200" />
      </div>
    </div>
  );
}

function AgencyLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-[42%] flex-col justify-end rounded-xl bg-ink p-3">
        <div className="h-3 w-1/2 rounded-full bg-white" />
        <div className="mt-2 h-2 w-1/3 rounded-full bg-accent" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        <div className="rounded-lg bg-accent/20" />
        <div className="rounded-lg border border-dashed border-accent bg-white" />
      </div>
    </div>
  );
}

function SaasLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col justify-center gap-2 rounded-xl bg-background p-3">
          <div className="h-2.5 w-4/5 rounded-full bg-ink" />
          <div className="h-2 w-full rounded-full bg-accent/40" />
          <div className="h-2 w-3/4 rounded-full bg-accent/40" />
          <div className="mt-1 h-6 w-16 rounded-full bg-ink" />
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
          <div className="h-2 w-1/2 rounded-full bg-zinc-200" />
          <div className="mt-3 h-8 rounded-lg bg-accent/20" />
          <div className="mt-2 h-8 rounded-lg bg-zinc-100" />
        </div>
      </div>
      <div className="flex h-6 items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-zinc-200" />
        <div className="h-2 flex-1 rounded-full bg-zinc-200" />
        <div className="h-2 flex-1 rounded-full bg-zinc-200" />
        <div className="h-2 flex-1 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

function EcommerceLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-2 w-10 rounded-full bg-ink" />
        <div className="h-6 flex-1 rounded-lg bg-zinc-100" />
        <div className="h-6 w-6 rounded-md bg-accent/20" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
        {["bg-background", "bg-zinc-100", "bg-zinc-100", "bg-accent/20"].map(
          (tone, index) => (
            <div key={tone + index} className={`flex flex-col justify-end rounded-lg p-1.5 ${tone}`}>
              <div className="h-1.5 w-2/3 rounded-full bg-white" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function LandingLayout() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-background to-white px-4">
      <div className="h-2 w-16 rounded-full bg-accent/40" />
      <div className="h-3 w-4/5 rounded-full bg-ink" />
      <div className="h-2 w-3/5 rounded-full bg-zinc-200" />
      <div className="mt-1 h-7 w-24 rounded-full bg-ink" />
      <div className="mt-2 grid w-full grid-cols-3 gap-2">
        <div className="h-6 rounded-md bg-white shadow-sm" />
        <div className="h-6 rounded-md bg-white shadow-sm" />
        <div className="h-6 rounded-md bg-white shadow-sm" />
      </div>
    </div>
  );
}

function DataLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 rounded-full bg-ink" />
        <div className="h-5 flex-1 rounded-md bg-zinc-100" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-4 gap-1.5">
        {["Name", "Email", "Role", "Region"].map((label) => (
          <div key={label} className="flex min-h-0 flex-col gap-1.5">
            <div className="rounded-md bg-ink px-1 py-1 text-center text-[8px] font-semibold text-white">
              {label}
            </div>
            <div className="h-2 rounded-full bg-accent/20" />
            <div className="h-2 rounded-full bg-zinc-100" />
            <div className="h-2 rounded-full bg-background" />
            <div className="h-2 rounded-full bg-zinc-100" />
            <div className="h-2 rounded-full bg-background" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldsLayout() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl bg-background p-3">
      <div className="h-2 w-20 rounded-full bg-ink" />
      {["w-full", "w-5/6", "w-4/5", "w-2/3", "w-3/4"].map((width, index) => (
        <div key={width + index} className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-accent/40" />
          <div className={`h-2 rounded-full bg-white ${width}`} />
        </div>
      ))}
    </div>
  );
}

function ExportLayout() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-accent/50 bg-white px-4">
      <div className="h-10 w-8 rounded-md bg-accent/20" />
      <div className="h-2.5 w-2/3 rounded-full bg-ink" />
      <div className="h-2 w-1/2 rounded-full bg-zinc-200" />
      <div className="mt-1 h-6 w-24 rounded-full bg-ink" />
    </div>
  );
}

function PromptsLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="h-2 w-16 rounded-full bg-accent-strong" />
        <div className="h-2 w-10 rounded-full bg-zinc-200" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] gap-2">
        <div className="flex flex-col gap-1.5 rounded-xl bg-background p-2">
          <div className="h-2 w-3/4 rounded-full bg-accent" />
          <div className="h-2 w-full rounded-full bg-white" />
          <div className="h-2 w-5/6 rounded-full bg-white" />
          <div className="h-2 w-2/3 rounded-full bg-white" />
          <div className="mt-auto h-2 w-1/2 rounded-full bg-accent/50" />
        </div>
        <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-200 bg-white p-2">
          <div className="h-2 w-1/2 rounded-full bg-zinc-300" />
          <div className="min-h-0 flex-1 rounded-lg bg-zinc-50" />
          <div className="h-5 w-16 rounded-full bg-accent-strong" />
        </div>
      </div>
    </div>
  );
}

function EbookLayout() {
  return (
    <div className="grid h-full grid-cols-[0.7fr_1.3fr] gap-2">
      <div className="flex flex-col justify-end rounded-xl bg-ink p-3">
        <div className="h-2.5 w-4/5 rounded-full bg-white" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-accent" />
        <div className="mt-4 h-8 rounded-md bg-ink" />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3">
        <div className="h-2 w-full rounded-full bg-zinc-200" />
        <div className="h-2 w-5/6 rounded-full bg-zinc-100" />
        <div className="h-2 w-full rounded-full bg-zinc-100" />
        <div className="h-2 w-2/3 rounded-full bg-zinc-100" />
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          <div className="h-6 rounded-md bg-background" />
          <div className="h-6 rounded-md bg-background" />
          <div className="h-6 rounded-md bg-background" />
        </div>
      </div>
    </div>
  );
}

function CanvaLayout() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-accent-strong" />
          <div className="h-2 w-10 rounded-full bg-zinc-300" />
        </div>
        <div className="h-5 w-14 rounded-full bg-accent-strong" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[0.28fr_1fr] gap-2">
        <div className="flex flex-col gap-1.5 rounded-xl bg-zinc-100 p-2">
          <div className="h-8 rounded-lg bg-white" />
          <div className="h-8 rounded-lg bg-white" />
          <div className="h-8 rounded-lg bg-accent/20" />
          <div className="mt-auto h-8 rounded-lg bg-white" />
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-background p-2">
          <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg bg-white">
            <div className="h-10 w-16 rounded-md bg-accent/50" />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-5 rounded bg-white" />
            <div className="h-5 rounded bg-white" />
            <div className="h-5 rounded bg-white" />
            <div className="h-5 rounded bg-accent/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

const layouts = {
  business: BusinessLayout,
  portfolio: PortfolioLayout,
  agency: AgencyLayout,
  saas: SaasLayout,
  ecommerce: EcommerceLayout,
  landing: LandingLayout,
  data: DataLayout,
  fields: FieldsLayout,
  export: ExportLayout,
  prompts: PromptsLayout,
  ebook: EbookLayout,
  canva: CanvaLayout,
};

export default function TemplateMockup({
  variant = "business",
  src = "",
  alt = "",
  className = "",
  sizes = "(min-width: 1024px) 640px, 100vw",
  eager = false,
}) {
  if (src) {
    return (
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          {...(eager ? { fetchPriority: "high", loading: "eager" } : { loading: "lazy" })}
        />
      </div>
    );
  }

  const Layout = layouts[variant] ?? layouts.business;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-background px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-rose-300" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <span className="ml-2 h-5 flex-1 rounded-md bg-white" />
      </div>
      <div className="aspect-[16/10] bg-surface p-3">
        <Layout />
      </div>
    </div>
  );
}
