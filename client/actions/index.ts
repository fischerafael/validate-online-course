"use server";

import { StateAI } from "@/client/hooks/useCourseState";
import { useCaseGenerateCourseContent } from "@/server/app/generate-course-content";
import {
  companyServices,
  CreateTransactionInput,
} from "@/server/services/company";
import {
  useCasesLandingPage,
  UseCasesLandingPageCreateInput,
} from "@/server/usecases";
import { pages } from "../config/pages";

export const actionGenerateCourseContent = async (input: StateAI) => {
  return await useCaseGenerateCourseContent(input);
};

export const actionCreateCompany = async (email: string) => {
  return await companyServices.createOrFind({ email });
};

export const actionPublishLP = async (
  input: UseCasesLandingPageCreateInput
) => {
  await useCasesLandingPage.create(input);
};

export const actionListLpsByCompanyId = async ({
  companyId,
}: {
  companyId: string;
}) => {
  return await useCasesLandingPage.listByCompanyId(companyId);
};

export const actionListAllSlugs = async () => {
  return await useCasesLandingPage.listLandingPagesSlugs();
};

export const actionViewLandingPageBySlug = async (slug: string) => {
  return await useCasesLandingPage.findBySlug(slug);
};

export const actionAddLeadToLandingPage = async ({
  slug,
  email,
}: {
  slug: string;
  email: string;
}) => {
  return await useCasesLandingPage.addLeadToLp(slug, email);
};

export const actionAddViewToLandingPage = async ({
  slug,
}: {
  slug: string;
}) => {
  return await useCasesLandingPage.addViewToLp(slug);
};

export const actionFindCompanyByOwnerEmail = async ({
  email,
}: {
  email: string;
}) => {
  const company = await companyServices.createOrFind({
    email: email,
  });
  console.log("[action][company]", company);
  return company;
};

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const actionCreatePaymentCheckout = async ({
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

export type ActionCreateTransactionInput = {
  companyId: string;
  email: string;
  type: "credit" | "debit";
  productId: string;
  priceId: string;
  quantity: number;
  totalInCents: number;
};

export const actionCreateTransaction = async (
  input: CreateTransactionInput
) => {
  return await companyServices.createTransaction(input);
};
