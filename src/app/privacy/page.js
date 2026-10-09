import DraftPage, { DraftSection } from "@/components/DraftPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How Afordz handles cart data, checkout details, and Razorpay payments. This page is not legal advice.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <DraftPage
      title="Privacy"
      lede="This note describes how the live store handles information today. It is not legal advice, and it is not a finished privacy policy."
    >
      <DraftSection title="What this store stores">
        <p>
          The cart is saved in localStorage on the device you are using, under the key afordz-cart. It holds the product id, name, slug, and price. There is no customer account.
        </p>
        <p>
          Checkout sends your name and email to this server. A pending or paid order is stored in a server database with the Razorpay order id, the amount, the currency, and a hash of the download token. Card numbers, UPI ids, and bank details are not stored here.
        </p>
        <p>
          The contact page is email only. It does not submit a form to this server.
        </p>
      </DraftSection>
      <DraftSection title="Payments">
        <p>
          Card numbers, UPI ids, and bank details are entered on Razorpay, not on this site. Afordz uses that payment only to confirm the captured amount and to issue the download described on the listing.
        </p>
      </DraftSection>
      <DraftSection title="Contact">
        <p>
          Questions can be sent to {site.email}. This page does not describe a support window or a response time.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
