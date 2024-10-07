import { payment } from "@/lib/payment";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[webhook] running");

  const payload = await req.text();
  const stripeSignature = req.headers.get("stripe-signature") as string;
  console.log("[webhook] payload", payload);
  console.log("[webhook] stripeSignature", stripeSignature);

  const { data, status } = await payment.webhook.fulfillCheckout({
    stripeSignature: stripeSignature,
    payload: payload,
  });

  console.log("[webhook] response", data, status);

  return Response.json({ data, status });
}
