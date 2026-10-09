import Link from "next/link";
import DraftPage, { DraftSection } from "@/components/DraftPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: "Afordz does not promise a refund, exchange, replacement, or credit after a Razorpay payment.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <DraftPage
      title="Refund Policy"
      lede="This refund page does not promise a refund, exchange, replacement, or credit. It is not legal advice."
    >
      <DraftSection title="Payments and downloads">
        <p>
          Checkout takes payment through Razorpay for the catalogue amount in INR. After this server confirms a captured payment for that order, a file product receives a private download that expires in 48 hours.
        </p>
        <p>
          Because the files are digital, this store does not offer a refund, exchange, replacement, or credit after a captured payment.
        </p>
      </DraftSection>
      <DraftSection title="How to send a question">
        <p>
          Write to {site.email}. You can also read the{" "}
          <Link className="font-semibold text-ink underline decoration-accent underline-offset-4" href="/contact">
            contact page
          </Link>{" "}
          and the{" "}
          <Link className="font-semibold text-ink underline decoration-accent underline-offset-4" href="/terms">
            terms
          </Link>
          .
        </p>
      </DraftSection>
      <DraftSection title="Not a guarantee">
        <p>
          Publishing this page does not create a legal guarantee beyond what is written here.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
