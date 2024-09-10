"use client";

import { LandingPageContent } from "@/client/entities";
import { atom, useRecoilState } from "recoil";

export const useCourseState = () => {
  const [courseState, setCourseState] =
    useRecoilState<StateCourse>(atomStateCourse);

  const onCourseSetResponseFromAI = (res: AIResponse) => {
    setCourseState((prev) => ({ ...prev, ...res }));
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

  console.log("[state]", courseState);

  const courseContentLandingPage: LandingPageContent = {
    contentAuthorAvatar: "#",
    contentAuthorBio: "#",
    contentAuthorLink: "#",
    contentAuthorName: "#",
    contentAuthorSectionLabel: "",
    contentFeaturesList: courseState.features,
    contentFeaturesSectionLabel: courseState.featuresSectionTitle,
    contentHashtags: courseState.hashtags,
    contentHeroHeading: courseState.heading,
    contentHeroSubHeading: courseState.subHeading,
    contentLandingPageCTA: courseState.cta,
  };

  const isCourseStateValuesFilled = Object.values(
    courseContentLandingPage
  ).every((val) => !!val);

  const [courseAI, setCourseAI] = useRecoilState<StateAI>(atomStateAI);

  const onStateAIChange = (key: keyof StateAI, value: string) => {
    setCourseAI((prev) => ({ ...prev, [key]: value }));
  };

  const isAiAudienceAndAboutFilled =
    !!courseAI.targetAudience && !!courseAI.whatIsTheCourseAbout;

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
  // authorSectionTitle: "Your teacher",
  // authorName: "",
  // authorAvatar: "",
  // authorBio: "",
  // authorLink: "",
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
}

const INITIAL_STATE_AI: StateAI = {
  extraContext: `
    1 - [Intro & Setup]
    2 - [Fundamentals]
    3 - [Advanced Topics]
    4 - [Conclusion]
  `,
  language: "english",
  targetAudience: "",
  unfairAdvantage: "",
  whatIsTheCourseAbout: "",
};

const atomStateAI = atom<StateAI>({
  key: "stateAI",
  default: INITIAL_STATE_AI,
});
