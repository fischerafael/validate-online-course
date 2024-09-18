import { dbLandingPages } from "@/client/config/firebase";
import { LandingPageContent } from "@/client/entities";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export interface LandingPageServerLead {
  id?: string;
  email: string;
  createdAt: string;
}

export interface LandingPageServer {
  id?: string;
  slug: string;
  companyOwner: string;
  leads: LandingPageServerLead[];
  views: number;
  content: LandingPageContent;
  contentVersion: string;
  companyId: string;
  createdAt: string;
  successMessage: string;
  successLink: string;
}

export type UseCasesLandingPageCreateInput = {
  title: string;
  companyOwner: string;
  companyId: string;
  content: LandingPageContent;
  slug: string;
};

export class UseCasesLandingPage {
  private repository: RepositoryLandingPage = new RepositoryLandingPage();
  private version: string = "v1";

  create = async ({
    title,
    companyOwner,
    content,
    companyId,
  }: UseCasesLandingPageCreateInput) => {
    const formattedSlug = this.generateSlug(title);

    const existingWithSlug = await this.repository.findBySlug(formattedSlug);
    if (existingWithSlug)
      throw new Error("Landing page with slug already exists");

    const lp: LandingPageServer = {
      companyOwner,
      content,
      contentVersion: this.version,
      leads: [],
      slug: formattedSlug,
      views: 0,
      companyId,
      createdAt: new Date().toISOString(),
      successLink: "",
      successMessage: "",
    };
    await this.repository.save(lp);
  };

  findBySlug = async (slug: string) => {
    const lp = await this.repository.findBySlug(slug);
    if (!lp) throw new Error("Not found");
    return lp;
  };

  listByCompanyId = async (companyId: string) => {
    const lps = await this.repository.listByCompanyId(companyId);
    return lps;
  };

  listLandingPagesSlugs = async () => {
    const lps = await this.repository.listAll();
    const slugs = lps.map((lp) => lp.slug);
    return slugs;
  };

  addLeadToLp = async (slug: string, email: string) => {
    const lp = await this.repository.findBySlug(slug);
    if (!lp) throw new Error("Not found");

    const alreadyExistingLead = lp.leads.some((lead) => lead.email === email);
    if (alreadyExistingLead) return;

    const updated: LandingPageServer = {
      ...lp,
      leads: [
        ...lp.leads,
        {
          email: email,
          id: new Date().getTime().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    };
    await this.repository.update(lp.id!, updated);
  };

  addViewToLp = async (slug: string) => {
    const lp = await this.repository.findBySlug(slug);
    if (!lp) throw new Error("Not found");
    const updated: LandingPageServer = {
      ...lp,
      views: lp.views + 1,
    };
    await this.repository.update(lp.id!, updated);
  };

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

  update = async (lpId: string, content: any) => {
    try {
      const document = doc(dbLandingPages, this.collectionName, lpId);
      await updateDoc(document, {
        ...content,
      });
    } catch (e: any) {
      console.log("[e]", e);
    }
  };

  listAll = async () => {
    try {
      const q = query(collection(dbLandingPages, this.collectionName));

      const querySnapshot = await getDocs(q);

      let lps: LandingPageServer[] = [];

      querySnapshot.forEach((doc) => {
        const lpData = {
          id: doc.id,
          ...doc.data(),
        } as LandingPageServer;
        lps.push(lpData);
      });

      if (!lps.length) return [];

      return lps;
    } catch (e: any) {
      return [];
    }
  };

  listByCompanyId = async (companyId: string) => {
    try {
      const q = query(
        collection(dbLandingPages, this.collectionName),
        where("companyId", "==", companyId)
      );

      const querySnapshot = await getDocs(q);

      let lps: LandingPageServer[] = [];

      querySnapshot.forEach((doc) => {
        const lpData = {
          id: doc.id,
          ...doc.data(),
        } as LandingPageServer;
        lps.push(lpData);
      });

      if (!lps.length) return [];

      return lps;
    } catch (e: any) {
      return [];
    }
  };

  findBySlug = async (slug: string) => {
    try {
      const q = query(
        collection(dbLandingPages, this.collectionName),
        where("slug", "==", slug)
      );

      const querySnapshot = await getDocs(q);

      let lps: LandingPageServer[] = [];

      querySnapshot.forEach((doc) => {
        const lpData = {
          id: doc.id,
          ...doc.data(),
        } as LandingPageServer;
        lps.push(lpData);
      });

      if (!lps.length) return undefined;

      return lps[0];
    } catch (e: any) {
      console.log("[e]", e);
    }
  };
}

export const useCasesLandingPage = new UseCasesLandingPage();
