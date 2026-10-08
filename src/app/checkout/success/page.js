import { cookies } from "next/headers";
import ClearPaidCart from "@/components/ClearPaidCart";
import { DOWNLOAD_COOKIE } from "@/lib/download-cookie";
import { resolveDownload } from "@/lib/fulfillment";
import { getPaidOrderByToken } from "@/lib/orders";
import { formatInr } from "@/data/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout receipt",
  description: "Receipt for an Afordz Razorpay test payment, with a time-limited download.",
};

function formatExpiry(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

function RecoveryForm({ message }) {
  return (
    <form method="post" action="/api/orders/recover" className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-zinc-950">Retrieve a test download</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Use the email from checkout and the Razorpay payment id (it starts with pay_). The server checks that the test payment was captured before it issues a new 48-hour download.
      </p>
      {message ? (
        <p role="alert" className="mt-4 text-sm font-medium text-red-800">
          {message}
        </p>
      ) : null}
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="recover-email" className="block text-sm font-semibold text-zinc-950">
            Email
          </label>
          <input
            id="recover-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="recover-payment" className="block text-sm font-semibold text-zinc-950">
            Razorpay payment id
          </label>
          <input
            id="recover-payment"
            name="paymentId"
            required
            spellCheck={false}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-indigo-700 px-6 py-2.5 text-sm font-semibold tracking-wide text-white"
      >
        Check payment
      </button>
    </form>
  );
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const query = await searchParams;
  const errorCode = typeof query.error === "string" ? query.error : "";
  const cookieStore = await cookies();
  const order = getPaidOrderByToken(cookieStore.get(DOWNLOAD_COOKIE)?.value);

  const message =
    errorCode === "unavailable"
      ? "Payment confirmation is unavailable right now. Try again shortly."
      : errorCode === "unmatched"
        ? "No captured test payment matched those details."
        : "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-amber-950">Razorpay test mode</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">Receipt</h1>

      {order ? (
        <div className="mt-8 space-y-6">
          <ClearPaidCart />
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-zinc-950">Payment confirmed</h2>
            <p className="mt-3 text-base leading-7 text-zinc-700">
              {order.customerName} ({order.customerEmail}). The server confirmed a captured test payment of {formatInr(order.amountPaise / 100)} INR.
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              This download expires at {formatExpiry(order.downloadExpiresAt)} IST. It is not a public file link.
            </p>
            <ul className="mt-6 space-y-4">
              {order.items.map((item) => {
                const file = resolveDownload(item.id);
                return (
                  <li key={item.id} className="flex flex-col gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-zinc-950">{item.name}</p>
                      <p className="text-sm text-zinc-600">One digital licence</p>
                    </div>
                    {file ? (
                      <a
                        href={`/api/downloads/${item.id}`}
                        className="text-sm font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4"
                      >
                        Download
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-600">The file for this licence is not on the server yet.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <RecoveryForm message={message} />
        </div>
      )}
    </div>
  );
}
