import { stripe } from "../stripe-instance";
import { fulfillCheckout } from "../use-cases/fulfill-checkout";

// instructions
// - run locally: stripe listen --forward-to localhost:3000/app/shop/api
// - send event: stripe trigger payment_intent.succeeded
// - just open the app and try to purchase something
// webhook route handler set at shop/api/route

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
