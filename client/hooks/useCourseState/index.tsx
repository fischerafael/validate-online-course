"use client";

import { LandingPageContent } from "@/client/entities";
import { atom, useRecoilState } from "recoil";
import { useAuth } from "../../../lib/auth/client/useAuth";
import { useEffect } from "react";
import { generateSlug } from "@/client/utils/generateSlug";

export const useCourseState = () => {
  const { methods } = useAuth();
  const [courseState, setCourseState] =
    useRecoilState<StateCourse>(atomStateCourse);

  const onCourseSetResponseFromAI = (res: AIResponse) => {
    setCourseState((prev) => ({
      ...prev,
      ...res,
      authorAvatar: methods.getAuthState()?.avatarURL!,
      authorName: methods.getAuthState()?.name!,
    }));
  };

  const onCourseChangeString = (key: keyof StateCourse, value: string) => {
    setCourseState((prev) => ({ ...prev, [key]: value }));
  };

  const onCourseAddArrValue = (key: "hashtags" | "features", value: string) => {
    const currentCurr = key === "hashtags" ? "currHashtag" : "currFeature";
    if (!courseState[currentCurr]) return;
    setCourseState((prev) => ({
      ...prev,
      [currentCurr]: "",
      [key]: [...prev[key], value],
    }));
  };

  const onCourseRemoveValue = (key: "hashtags" | "features", value: string) => {
    setCourseState((prev) => ({
      ...prev,
      [key]: prev[key].filter((val) => val !== value),
    }));
  };

  const [courseAI, setCourseAI] = useRecoilState<StateAI>(atomStateAI);

  useEffect(() => {
    if (!courseAI.title) return;
    onStateAIChange("slug", generateSlug(courseAI.title));
  }, [courseAI.title]);

  const onStateAIChange = (key: keyof StateAI, value: string) => {
    setCourseAI((prev) => ({ ...prev, [key]: value }));
  };

  const onResetAIState = () => setCourseAI(INITIAL_STATE_AI);

  const isAiAudienceAndAboutFilled =
    !!courseAI.targetAudience &&
    !!courseAI.whatIsTheCourseAbout &&
    !!courseAI.title;

  const courseContentLandingPage: LandingPageContent = {
    contentAuthorAvatar: courseState.authorAvatar,
    contentAuthorName: courseState.authorName,
    contentFeaturesList: courseState.features,
    contentFeaturesSectionLabel: courseState.featuresSectionTitle,
    contentHashtags: courseState.hashtags,
    contentHeroHeading: courseState.heading,
    contentHeroSubHeading: courseState.subHeading,
    contentLandingPageCTA: courseState.cta,
    title: courseAI.title,
  };

  const isCourseStateValuesFilled = Object.values(
    courseContentLandingPage
  ).every((val) => !!val);

  return {
    state: {
      courseState,
      courseAI,
      courseContentLandingPage,
      isCourseStateValuesFilled,
      isAiAudienceAndAboutFilled,
    },
    methods: {
      onCourseRemoveValue,
      onCourseAddArrValue,
      onCourseChangeString,
      onCourseSetResponseFromAI,
      onStateAIChange,
      onResetAIState,
    },
  };
};

export interface StateCourse {
  heading: string;
  subHeading: string;
  cta: string;
  hashtags: string[];
  featuresSectionTitle: string;
  features: string[];
  currHashtag: string;
  currFeature: string;
  authorName: string;
  authorAvatar: string;
}

export interface AIResponse {
  heading: string;
  subHeading: string;
  cta: string;
  hashtags: string[]; // min 1 max 3
  featuresSectionTitle: string;
  features: string[]; // min 3 max 6
}

export const INITIAL_STATE_COURSE: StateCourse = {
  heading: "",
  subHeading: "",
  cta: "",
  currHashtag: "",
  hashtags: [],
  featuresSectionTitle: "You will learn",
  currFeature: "",
  features: [],
  authorName: "",
  authorAvatar: "",
};

const atomStateCourse = atom<StateCourse>({
  key: "stateCourse",
  default: INITIAL_STATE_COURSE,
});

export interface StateAI {
  targetAudience: string;
  whatIsTheCourseAbout: string;
  extraContext: string;
  unfairAdvantage: string;
  language: string;
  title: string;
  successLink: string;
  slug: string;
}

const INITIAL_STATE_AI: StateAI = {
  extraContext: ``,
  language: "english",
  targetAudience: "",
  unfairAdvantage: "",
  whatIsTheCourseAbout: "",
  title: "",
  successLink: "",
  slug: "",
};

const atomStateAI = atom<StateAI>({
  key: "stateAI",
  default: INITIAL_STATE_AI,
});
