import { organisations } from "@/lib/organisations";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// instructions
// - run locally: stripe listen --forward-to localhost:3000/app/shop/api
// - send event: stripe trigger payment_intent.succeeded
// - just open the app and try to purchase something

export const webhook = async ({
  stripeSignature,
  payload,
}: {
  stripeSignature: string;
  payload: string;
}) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      stripeSignature,
      process.env.STRIPE_ENDPOINT_SECRET!
    );
    console.log("[webhook] event", event);
  } catch (err) {
    console.log("[webhook] error", err);

    return {
      data: err,
      status: 400,
    };
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    console.log(
      "[webhook] event.type",
      "checkout.session.completed or checkout.session.async_payment_succeeded"
    );
    await fulfillCheckout(event.data.object.id);
  }

  return {
    data: "Success",
    status: 200,
  };
};

async function fulfillCheckout(sessionId: string) {
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
}
