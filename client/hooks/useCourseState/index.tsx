"use client";

import { LandingPageContent } from "@/client/entities";
import { atom, useRecoilState } from "recoil";

export const useCourseState = () => {
  const [courseState, setCourseState] = useRecoilState<CourseState>(atomState);

  const onChangeString = (key: keyof CourseState, value: string) => {
    setCourseState((prev) => ({ ...prev, [key]: value }));
  };

  const onAddArrValue = (key: "hashtags" | "features", value: string) => {
    const currentCurr = key === "hashtags" ? "currHashtag" : "currFeature";
    if (!courseState[currentCurr]) return;
    setCourseState((prev) => ({
      ...prev,
      [currentCurr]: "",
      [key]: [...prev[key], value],
    }));
  };

  const onRemoveValue = (key: "hashtags" | "features", value: string) => {
    setCourseState((prev) => ({
      ...prev,
      [key]: prev[key].filter((val) => val !== value),
    }));
  };

  console.log("[state]", courseState);

  const landingPageContent: LandingPageContent = {
    contentAuthorAvatar: courseState.authorAvatar,
    contentAuthorBio: courseState.authorBio,
    contentAuthorLink: courseState.authorLink,
    contentAuthorName: courseState.authorName,
    contentAuthorSectionLabel: courseState.authorSectionTitle,
    contentFeaturesList: courseState.features,
    contentFeaturesSectionLabel: courseState.featuresSectionTitle,
    contentHashtags: courseState.hashtags,
    contentHeroHeading: courseState.heading,
    contentHeroSubHeading: courseState.subHeading,
    contentLandingPageCTA: courseState.cta,
  };

  const isAllValuesFilled = Object.values(landingPageContent).every(
    (val) => !!val
  );

  return {
    state: {
      state: courseState,
      landingPageContent,
      isAllValuesFilled: isAllValuesFilled,
    },
    methods: {
      onRemoveValue,
      onAddArrValue,
      onChangeString,
    },
  };
};

export interface CourseState {
  heading: string;
  subHeading: string;
  cta: string;
  hashtags: string[];
  currHashtag: string;
  featuresSectionTitle: string;
  features: string[];
  currFeature: string;
  authorSectionTitle: string;
  authorName: string;
  authorAvatar: string;
  authorBio: string;
  authorLink: string;
}

export const INITIAL_STATE: CourseState = {
  heading: "",
  subHeading: "",
  cta: "",
  currHashtag: "",
  hashtags: [],
  featuresSectionTitle: "You will learn",
  currFeature: "",
  features: [],
  authorSectionTitle: "Your teacher",
  authorName: "",
  authorAvatar: "",
  authorBio: "",
  authorLink: "",
};

const atomState = atom<CourseState>({
  key: "courseState",
  default: INITIAL_STATE,
});
