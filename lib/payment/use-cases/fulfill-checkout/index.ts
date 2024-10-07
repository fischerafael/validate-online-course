import { organisations } from "@/lib/organisations";
import { stripe } from "../../stripe-instance";

export const fulfillCheckout = async (sessionId: string) => {
  try {
    console.log("[webhook][fulfillCheckout]", sessionId);

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    console.log("[webhook][fulfillCheckout][checkoutSession]", checkoutSession);

    const paymentStatus = checkoutSession.payment_status;
    console.log("[webhook][fulfillCheckout][paymentStatus]", paymentStatus);

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed
    if (paymentStatus === "unpaid") {
      console.log("[webhook failed] unpaid");
      return;
    }

    const transactionId = checkoutSession?.metadata?.transactionId;
    console.log("[webhook][fulfillCheckout][transactionId]", transactionId);
    const companyId = checkoutSession?.metadata?.companyId;
    console.log("[webhook][fulfillCheckout][transactionId]", companyId);

    if (!transactionId || !companyId) {
      console.log(
        "[webhook failed] no company id or transaction id on the metadata"
      );
      return;
    }

    await organisations.companyServices.confirmTransaction({
      companyId: companyId,
      transactionId: transactionId,
    });

    console.log("[webhook success] paid successfully!");
  } catch (e: any) {
    console.log("[e][webhook][fulfillCheckout]", e);
    console.log("[e][webhook][fulfillCheckout]", JSON.stringify(e));
  }
};
