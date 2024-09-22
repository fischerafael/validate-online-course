import { NextRequest } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("[body]", body);

  // if (
  //   event.type === "checkout.session.completed" ||
  //   event.type === "checkout.session.async_payment_succeeded"
  // ) {
  //   fulfillCheckout(event.data.object.id);
  // }
  return Response.json({ data: body });
}
