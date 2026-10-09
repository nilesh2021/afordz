import Button from "@/components/Button";

export const metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        That address is not part of the Afordz store.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </div>
  );
}
