import { dbLandingPages } from "@/client/config/firebase";
import { addDoc, collection } from "firebase/firestore";

interface LandingPageServerLead {
  id?: string;
  email: string;
}

interface LandingPageServer {
  id?: string;
  slug: string;
  companyOwner: string;
  leads: LandingPageServerLead[];
  views: number;
  content: any;
  contentVersion: string;
}

export type UseCasesLandingPageCreateInput = {
  title: string;
  companyOwner: string;
  companyId: string;
  content: object;
  slug: string;
};

export class UseCasesLandingPage {
  private repository: RepositoryLandingPage = new RepositoryLandingPage();

  create = async ({
    title,
    companyOwner,
    content,
    companyId,
    slug,
  }: UseCasesLandingPageCreateInput) => {
    const formattedSlug = this.generateSlug(title);
    await this.repository.save({
      companyOwner,
      companyId,
      content,
      slug: formattedSlug,
      title,
    });
  };

  findBySlug = async (slug: string) => {};
  // create landing page
  // view landing pages by org
  // view landing page by slug
  // addLead

  private generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };
}

export class RepositoryLandingPage {
  private collectionName = `${process.env.APP_NAME}.landing_pages`;

  save = async (input: any) => {
    try {
      await addDoc(collection(dbLandingPages, this.collectionName), input);
    } catch (e: any) {
      console.log("[e]", e);
    }
  };

  //   findBySlug = async ({
  //     slug,
  //     companyOwner,
  //   }: {
  //     slug: string;
  //     companyOwner: string;
  //   }) => {
  //     try {
  //       const { data } = await db.get(`crud`, {
  //         headers: {
  //           app: this.appName,
  //           user: companyOwner,
  //           action: "LIST",
  //         },
  //         params: {
  //           slug: slug,
  //         },
  //       });

  //       const response = data.data.response[0];
  //       if (!response) return undefined;

  //       const responseData = { ...response.data, id: response.id };

  //       return responseData;
  //     } catch (e: any) {
  //       console.log("[e]", e);
  //       return undefined;
  //     }
  //   };
}

export const useCasesLandingPage = new UseCasesLandingPage();
