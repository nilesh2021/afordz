import DraftPage, { DraftSection } from "@/components/DraftPage";

export const metadata = {
  title: "Terms",
  description: "Editable draft terms for the Afordz demo store. Not a legal agreement.",
};

export default function TermsPage() {
  return (
    <DraftPage
      title="Terms"
      lede="These draft terms describe the demo store. They are not a contract, not legal advice, and not a licence to the template files."
    >
      <DraftSection title="What the store offers">
        <p>
          Afordz currently lists one digital product, 500 Bootstrap 5 and 500 Tailwind HTML Templates. The product page describes the 1,000 single HTML files in the download. Licence and support text stay drafts until you replace them.
        </p>
      </DraftSection>
      <DraftSection title="Checkout">
        <p>
          Checkout opens a Razorpay payment for the catalogue amount in INR. A download is released only after this server confirms that Razorpay captured the payment for the same order, amount, and INR currency. The download expires. These draft terms are not a licence to the template files.
        </p>
      </DraftSection>
      <DraftSection title="Licence">
        <p>
          The usage licence on the product page is a draft. It does not grant rights to copy, adapt, resell, or redistribute the templates. Replace it with the licence you intend to offer before you take payment.
        </p>
      </DraftSection>
      <DraftSection title="No extra promises">
        <p>
          This draft does not promise uptime, fitness for a particular project, error-free templates, or a support response. Add only the commitments you are prepared to keep.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
