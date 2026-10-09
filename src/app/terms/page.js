import DraftPage, { DraftSection } from "@/components/DraftPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "How Afordz checkout, downloads, and listings work today. This page is not a licence and not legal advice.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <DraftPage
      title="Terms"
      lede="These notes describe the live store. They are not a contract, not legal advice, and not a licence to the template files."
    >
      <DraftSection title="What the store offers">
        <p>
          Afordz currently sells one digital product: 500 Bootstrap 5 and 500 Tailwind HTML Templates. The product page describes the 1,000 single HTML files in the download. A Canva subscription listing is visible as coming soon and cannot be purchased yet.
        </p>
      </DraftSection>
      <DraftSection title="Checkout">
        <p>
          Checkout opens a Razorpay payment for the catalogue amount in INR. A download is released only after this server confirms that Razorpay captured the payment for the same order, amount, and INR currency. The download expires after 48 hours. These notes are not a licence to the template files.
        </p>
      </DraftSection>
      <DraftSection title="Licence">
        <p>
          The product page does not publish a usage licence. This page does not grant rights to copy, adapt, resell, or redistribute the templates. Read the listing and any text inside the download before you use a file on a client site or a commercial project.
        </p>
      </DraftSection>
      <DraftSection title="No extra promises">
        <p>
          This page does not promise uptime, fitness for a particular project, error-free templates, or a support response time.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
