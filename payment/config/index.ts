export const products = {
  credits_100: {
    productId: process.env.NEXT_PUBLIC_PRODUCT_100_PRODUCT!,
    priceId: process.env.NEXT_PUBLIC_PRODUCT_100_PRICE!,
    title: "100 Credits",
    credits: 150,
    priceInCents: 1000,
    priceLabel: "10.00",
    currency: "USD",
  },
  credits_10: {
    productId: process.env.NEXT_PUBLIC_PRODUCT_10_PRODUCT!,
    priceId: process.env.NEXT_PUBLIC_PRODUCT_10_PRICE!,
    title: "10 Credits",
    credits: 10,
    priceInCents: 100,
    priceLabel: "1.00",
    currency: "USD",
  },
};

const prices = {
  generateLandingPageCopy: {
    title: "generateLandingPageCopy",
    quantity: 7,
  },
  publishLandingPage: {
    title: "publishLandingPage",
    quantity: 3,
  },
};

export const payment = {
  products,
  prices,
};
