import { companyServices } from "@/server/services/company";
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
  console.log("[webhook] running");
  const payload = await req.text();
  console.log("[webhook] payload", payload);
  const stripeSignature = req.headers.get("stripe-signature") as string;
  console.log("[webhook] stripeSignature", stripeSignature);

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

    return Response.json(
      { data: err },
      {
        status: 400,
      }
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    console.log(
      "[webhook] event.type",
      "checkout.session.completed or checkout.session.async_payment_succeeded"
    );
    fulfillCheckout(event.data.object.id);
  }

  return Response.json({ data: "Success" });
}

async function fulfillCheckout(sessionId: string) {
  console.log("[fulfillCheckout]", sessionId);

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const paymentStatus = checkoutSession.payment_status;

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (paymentStatus === "unpaid") {
    console.log("[webhook failed] unpaid");
    return;
  }

  const transactionId = checkoutSession?.metadata?.transactionId;
  const companyId = checkoutSession?.metadata?.companyId;

  if (!transactionId || !companyId) {
    console.log(
      "[webhook failed] no company id or transaction id on the metadata"
    );
    return;
  }

  await companyServices.confirmTransaction({
    companyId: companyId,
    transactionId: transactionId,
  });

  console.log("[webhook success] paid successfully!");
}
