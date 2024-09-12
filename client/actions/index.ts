"use server";

import { StateAI } from "@/client/hooks/useCourseState";
import { useCaseGenerateCourseContent } from "@/server/app/generate-course-content";

export const actionGenerateCourseContent = async (input: StateAI) => {
  return await useCaseGenerateCourseContent(input);
};
