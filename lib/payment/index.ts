import { createPaymentCheckout } from "./use-cases/create-payment-checkout";
import { fulfillCheckout } from "./use-cases/fulfill-checkout";
import { fulfillCheckoutController } from "./webhook";

export const payment = {
  useCases: {
    createPaymentCheckout,
  },
  webhook: {
    fulfillCheckout: fulfillCheckoutController,
  },
};
