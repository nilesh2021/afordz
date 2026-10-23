import Link from "next/link";
import DraftPage, { DraftSection } from "@/components/DraftPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: "All digital sales on Afordz are final once Razorpay captures payment. How downloads and questions work.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <DraftPage
      title="Refund Policy"
      lede="All digital sales are final once payment is captured. This page is plain-language guidance, not legal advice."
    >
      <DraftSection title="Payments and downloads">
        <p>
          Checkout takes payment through Razorpay for the catalogue amount in INR. After this server confirms a captured payment for that order, a file product receives a private download that expires in 48 hours.
        </p>
        <p>
          Because the products are digital, we do not offer refunds, exchanges, replacements, or store credit after a captured payment.
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
      <DraftSection title="Questions">
        <p>
          If something went wrong with delivery after a verified payment, email us and we will help you get the file you paid for.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
