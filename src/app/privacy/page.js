import DraftPage, { DraftSection } from "@/components/DraftPage";
import { site } from "@/data/site";

export const metadata = {
  title: "Privacy",
  description: "Draft privacy note for Afordz checkout, including the Razorpay payment.",
};

export default function PrivacyPage() {
  return (
    <DraftPage
      title="Privacy"
      lede="This is a draft privacy note for the demo store. It is not legal advice, and it does not describe a finished data practice."
    >
      <DraftSection title="What this store stores">
        <p>
          The cart is saved in localStorage on the device you are using, under the key afordz-cart. It holds the product id, name, slug, and price. There is no customer account.
        </p>
        <p>
          Checkout sends your name and email to this server. A paid test order is stored in a SQLite database on the server, with the Razorpay order id, the amount in paise, the currency, and a hash of the download token. The contact form still keeps its text in the page only.
        </p>
      </DraftSection>
      <DraftSection title="Payments">
        <p>
          Card numbers, UPI ids, and bank details are entered on Razorpay, not on this site. This draft does not authorise selling or sharing personal information.
        </p>
      </DraftSection>
      <DraftSection title="Contact">
        <p>
          The published address is {site.email}. That address is a placeholder. Replace it, and replace this page, before you invite customers to share personal details.
        </p>
      </DraftSection>
    </DraftPage>
  );
}
