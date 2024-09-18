"use server";

import { StateAI } from "@/client/hooks/useCourseState";
import { useCaseGenerateCourseContent } from "@/server/app/generate-course-content";
import { companyServices } from "@/server/services/company";
import {
  useCasesLandingPage,
  UseCasesLandingPageCreateInput,
} from "@/server/usecases";

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

export const actionAddLeadToLandingPage = async (
  slug: string,
  email: string
) => {
  return await useCasesLandingPage.addLeadToLp(slug, email);
};

export const actionFindCompanyByOwnerEmail = async ({
  email,
}: {
  email: string;
}) => {
  return await companyServices.createOrFind({
    email: email,
  });
};
