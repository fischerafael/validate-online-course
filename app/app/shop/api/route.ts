import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text();
  const stripeSignature = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      stripeSignature,
      process.env.STRIPE_ENDPOINT_SECRET!
    );
  } catch (err) {
    console.log("[err]", err);
    return Response.json(
      { data: "error" },
      {
        status: 400,
      }
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    fulfillCheckout(event.data.object.id);
  }

  // console.log("[event]", event);

  return Response.json({ data: "body" });
}

async function fulfillCheckout(sessionId: string) {
  console.log("[fulfillCheckout]", sessionId);
  // console.log("Fulfilling Checkout Session " + sessionId);

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const paymentStatus = checkoutSession.payment_status;

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (paymentStatus === "unpaid") {
    // TODO: Perform fulfillment of the line items
    // TODO: Record/save fulfillment status for this
    // Checkout Session
    console.log("[unpaid]");
    return;
  }

  const transactionId = checkoutSession?.metadata?.transactionId;
  console.log("[________________________transactionId]", transactionId);

  /// set on the db to paid
}
