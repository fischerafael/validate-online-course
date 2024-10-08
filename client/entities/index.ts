export interface LandingPageContent {
  contentHashtags: string[];
  title: string;
  contentHeroHeading: string;
  contentHeroSubHeading: string;
  contentAuthorName: string;
  contentAuthorAvatar: string;
  contentFeaturesSectionLabel: string;
  contentFeaturesList: string[];
  contentLandingPageCTA: string;
}

export interface LandingPageActions {
  value?: string;
  isLoading?: boolean;
  onChangeValue?: (val: string) => void;
  onSubmit?: () => Promise<void>;
}

export interface LandingPageInfo {
  id?: string;
  ownerCompanyId: string;
  createdAt: string;
  views: number;
  leads: Lead[];
}

export interface LandingPage extends LandingPageContent, LandingPageInfo {}

export interface Lead {
  id: string;
  email: string;
  createdAt: string;
}

export interface CourseContent {
  section: string;
  lessons: string[];
}
