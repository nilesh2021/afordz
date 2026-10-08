import { hasAffiliateUrl } from "@/data/products";

const buttonClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-2.5 text-center text-sm font-semibold tracking-wide transition-colors bg-indigo-700 text-white shadow-[0_12px_28px_rgb(67_56_202/0.32)] hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1";

export default function AffiliateOfferCta({ product }) {
  const urlReady = hasAffiliateUrl(product);

  return (
    <div className="mt-8">
      <p className="font-display text-4xl tracking-tight text-zinc-950">Check current price</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Price is set by the vendor. Afordz does not list a fixed amount for this offer.
      </p>

      <div className="mt-6">
        {urlReady ? (
          <a
            href={product.affiliateUrl.trim()}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className={buttonClass}
          >
            View Offer on Vendor Website
          </a>
        ) : (
          <button type="button" className={buttonClass} disabled>
            View Offer on Vendor Website
          </button>
        )}
      </div>

      {!urlReady ? (
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The vendor link is not configured yet. This listing is for local review only.
        </p>
      ) : null}

      <p className="mt-4 text-sm leading-6 text-zinc-700">
        We may earn a commission if you purchase through this link.
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Checkout, delivery, and support for this offer are handled on the vendor website. This
        listing does not add the offer to the Afordz cart and does not provide a local download.
      </p>
    </div>
  );
}
