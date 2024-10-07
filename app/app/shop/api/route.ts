import { webhook } from "@/lib/payment/webhook";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[webhook] running");

  const payload = await req.text();
  const stripeSignature = req.headers.get("stripe-signature") as string;
  console.log("[webhook] payload", payload);
  console.log("[webhook] stripeSignature", stripeSignature);

  const { data, status } = await webhook({
    stripeSignature: stripeSignature,
    payload: payload,
  });

  return Response.json({ data, status });
}

// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function POST(req: NextRequest, res: NextResponse) {
//   console.log("[webhook] running");
//   const payload = await req.text();
//   console.log("[webhook] payload", payload);
//   const stripeSignature = req.headers.get("stripe-signature") as string;
//   console.log("[webhook] stripeSignature", stripeSignature);

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       payload,
//       stripeSignature,
//       process.env.STRIPE_ENDPOINT_SECRET!
//     );
//     console.log("[webhook] event", event);
//   } catch (err) {
//     console.log("[webhook] error", err);

//     return Response.json(
//       { data: err },
//       {
//         status: 400,
//       }
//     );
//   }

//   if (
//     event.type === "checkout.session.completed" ||
//     event.type === "checkout.session.async_payment_succeeded"
//   ) {
//     console.log(
//       "[webhook] event.type",
//       "checkout.session.completed or checkout.session.async_payment_succeeded"
//     );
//     await fulfillCheckout(event.data.object.id);
//   }

//   return Response.json({ data: "Success" });
// }

// async function fulfillCheckout(sessionId: string) {
//   try {
//     console.log("[webhook][fulfillCheckout]", sessionId);

//     // Retrieve the Checkout Session from the API with line_items expanded
//     const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["line_items"],
//     });
//     console.log("[webhook][fulfillCheckout][checkoutSession]", checkoutSession);

//     const paymentStatus = checkoutSession.payment_status;
//     console.log("[webhook][fulfillCheckout][paymentStatus]", paymentStatus);

//     // Check the Checkout Session's payment_status property
//     // to determine if fulfillment should be peformed
//     if (paymentStatus === "unpaid") {
//       console.log("[webhook failed] unpaid");
//       return;
//     }

//     const transactionId = checkoutSession?.metadata?.transactionId;
//     console.log("[webhook][fulfillCheckout][transactionId]", transactionId);
//     const companyId = checkoutSession?.metadata?.companyId;
//     console.log("[webhook][fulfillCheckout][transactionId]", companyId);

//     if (!transactionId || !companyId) {
//       console.log(
//         "[webhook failed] no company id or transaction id on the metadata"
//       );
//       return;
//     }

//     await organisations.companyServices.confirmTransaction({
//       companyId: companyId,
//       transactionId: transactionId,
//     });

//     console.log("[webhook success] paid successfully!");
//   } catch (e: any) {
//     console.log("[e][webhook][fulfillCheckout]", e);
//     console.log("[e][webhook][fulfillCheckout]", JSON.stringify(e));
//   }
// }
