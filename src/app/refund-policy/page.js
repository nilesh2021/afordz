import Link from "next/link";
import DraftPage, { DraftSection } from "@/components/DraftPage";
import { site } from "@/data/site";

export const metadata = {
  title: "Refund Policy",
  description: "Editable draft refund note for Afordz. This page does not promise a refund.",
};

export default function RefundPolicyPage() {
  return (
    <DraftPage
      title="Refund Policy"
      lede="This refund page is an editable draft. It does not promise a refund, exchange, replacement, or credit."
    >
      <DraftSection title="Nothing is confirmed yet">
        <p>
          Digital files are not delivered by this demo, and no payment is taken. Because of that, this page cannot describe a refund that has been agreed. Decide the rule that fits the way you will sell the archive, then replace this text.
        </p>
        <p>
          Some sellers limit refunds after a download link has been used. Some offer a short window for damaged files. Either choice has to be written by you. This draft does not choose one.
        </p>
      </DraftSection>
      <DraftSection title="How a request would be sent">
        <p>
          When you publish a real address, customers can write to {site.email}. That address is a placeholder, and sending mail there will not reach Afordz. The phone number {site.phone} is also a placeholder.
        </p>
        <p>
          You can also read the <Link className="font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4" href="/contact">contact page</Link> and the <Link className="font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4" href="/terms">terms</Link>.
        </p>
      </DraftSection>
      <DraftSection title="Not a guarantee">
        <p>
          Publishing this page does not create a legal guarantee. Have the final policy reviewed for the places where you sell before you rely on it.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
