"use server";

import { StateAI } from "@/client/hooks/useCourseState";
import { useCaseGenerateCourseContent } from "@/server/app/generate-course-content";

import {
  useCasesLandingPage,
  UseCasesLandingPageCreateInput,
} from "@/server/usecases";

export const actionGenerateCourseContent = async (input: StateAI) => {
  return await useCaseGenerateCourseContent(input);
};

export const actionCreateCompany = async (email: string) => {
  return await organisations.companyServices.createOrFind({ email });
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
  const company = await organisations.companyServices.createOrFind({
    email: email,
  });
  console.log("[action][company]", company);
  return company;
};

import { createPaymentCheckout } from "@/lib/payment/use-cases/create-payment-checkout";

export const actionCreatePaymentCheckout = async (input: {
  priceId: string;
  transactionId: string;
  companyId: string;
  email: string;
  quantity?: number;
}): Promise<{ url: string; sessionId: string }> => {
  return await createPaymentCheckout(input);
};

import { CreateTransactionInput } from "@/lib/organisations/use-cases";
import { organisations } from "@/lib/organisations";

export const actionCreateTransaction = async (
  input: CreateTransactionInput
) => {
  return await organisations.companyServices.createTransaction(input);
};
