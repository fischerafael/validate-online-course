import {
  actionListAllSlugs,
  actionViewLandingPageBySlug,
} from "@/client/actions";
import { PageDynamicLandingPage } from "@/client/pages/PageDynamicLandingPage";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs: string[] = await actionListAllSlugs();
  console.log("[generateStaticParams]", slugs);
  const formatted = slugs.map((slug) => ({
    slug: slug,
  }));
  console.log("[generateStaticParams][formatted]", formatted);
  return formatted;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const landingPageContent = await actionViewLandingPageBySlug(params.slug);
  console.log("[landingPageContent]", landingPageContent);
  return <PageDynamicLandingPage content={landingPageContent} />;
};

export default Page;
