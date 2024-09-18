import { LandingPage } from "@/client/components/LandingPage";
import { LandingPageServer } from "@/server/usecases";

export const PageDynamicLandingPage = ({
  content,
}: {
  content: LandingPageServer;
}) => {
  return <LandingPage content={content.content} />;
};
