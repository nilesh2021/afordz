import { cookies } from "next/headers";
import ClearPaidCart from "@/components/ClearPaidCart";
import { DOWNLOAD_COOKIE } from "@/lib/download-cookie";
import { resolveDownload } from "@/lib/fulfillment";
import { getPaidOrderByToken } from "@/lib/orders";
import { formatInr } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Checkout receipt",
  description: "Receipt for an Afordz Razorpay payment, with a time-limited download.",
  path: "/checkout/success",
  index: false,
});

function formatExpiry(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

const fieldClass =
  "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-ink shadow-inner shadow-ink/5 transition placeholder:text-muted focus:border-accent-strong focus:bg-surface focus:outline-none";

function RecoveryForm({ message }) {
  return (
    <form
      method="post"
      action="/api/orders/recover"
      className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_60px_rgb(22_20_16/0.08)]"
    >
      <div className="px-6 pt-8 text-center sm:px-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent-strong text-surface shadow-[0_8px_18px_rgb(109_40_217/0.35)]">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
            <path
              d="M12 4v10m0 0 4-4m-4 4-4-4M5 18.5h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">Already paid</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-ink">Retrieve a download</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          Use the email from checkout and the Razorpay payment id. It starts with pay_. The server checks that the payment was captured, then issues a new 48-hour download.
        </p>
      </div>
      <div className="px-6 py-7 sm:px-8">
        {message ? (
          <p role="alert" className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {message}
          </p>
        ) : null}
        <div className="space-y-5">
          <div>
            <label htmlFor="recover-email" className="block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="recover-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@email.com"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="recover-payment" className="block text-sm font-semibold text-ink">
              Razorpay payment id
            </label>
            <input
              id="recover-payment"
              name="paymentId"
              required
              spellCheck={false}
              placeholder="pay_"
              className={`${fieldClass} font-mono text-sm`}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-strong px-6 py-3 text-sm font-semibold tracking-wide text-surface shadow-[0_10px_24px_rgb(109_40_217/0.28)] transition hover:bg-[#5b21b6]"
        >
          Check payment
        </button>
      </div>
    </form>
  );
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const query = await searchParams;
  const errorCode = typeof query.error === "string" ? query.error : "";
  const cookieStore = await cookies();
  const order = await getPaidOrderByToken(cookieStore.get(DOWNLOAD_COOKIE)?.value);

  const message =
    errorCode === "unavailable"
      ? "Payment confirmation is unavailable right now. Try again shortly."
      : errorCode === "unmatched"
        ? "No captured payment matched those details."
        : "";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      {order ? (
        <>
          <p className="text-sm font-semibold text-amber-950">Razorpay</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink">Receipt</h1>
        </>
      ) : (
        <h1 className="sr-only">Retrieve a download</h1>
      )}

      {order ? (
        <div className="mt-8 space-y-6">
          <ClearPaidCart />
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-ink">Payment confirmed</h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {order.customerName} ({order.customerEmail}). The server confirmed a captured payment of {formatInr(order.amountPaise / 100)} INR.
            </p>
            {order.items.some((item) => resolveDownload(item.id)) ? (
              <p className="mt-3 text-sm leading-6 text-muted">
                A file download expires at {formatExpiry(order.downloadExpiresAt)} IST. It is not a public file link.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted">
                This order does not include a download file.
              </p>
            )}
            <ul className="mt-6 space-y-4">
              {order.items.map((item) => {
                const file = resolveDownload(item.id);
                return (
                  <li key={item.id} className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-ink">{item.name}</p>
                      <p className="text-sm text-muted">One digital licence</p>
                    </div>
                    {file ? (
                      <a
                        href={`/api/downloads/${item.id}`}
                        className="text-sm font-semibold text-ink underline decoration-accent underline-offset-4"
                      >
                        Download
                      </a>
                    ) : (
                      <p className="text-sm text-muted">This listing does not include a download file.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <RecoveryForm message={message} />
      )}
    </div>
  );
}
