import { pages } from "@/client/config/pages";
import { stripe } from "../../stripe-instance";

export const createPaymentCheckout = async ({
  priceId,
  transactionId,
  companyId,
  email,
  quantity = 1,
}: {
  priceId: string;
  transactionId: string;
  companyId: string;
  email: string;
  quantity?: number;
}): Promise<{ url: string; sessionId: string }> => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      metadata: { transactionId, companyId, email },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${pages.appShop.href}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${pages.appShop.href}?canceled=true`,
    });

    const checkoutUrl = session?.url;
    if (!checkoutUrl) throw new Error("no Url");

    return {
      url: checkoutUrl,
      sessionId: session.id,
    };
  } catch (e: any) {
    console.log("[e]", e);
    return {
      url: "#",
      sessionId: "",
    };
  }
};
