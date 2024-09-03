import { db } from "../config/axios";
import { Company } from "../entities";

class FireStoreRepository {
  private appName = process.env.APP_NAME;

  async createCompany({ company }: { company: Company }) {
    try {
      await db.post(`crud`, company, {
        headers: {
          app: this.appName,
          user: company.users[0].email,
        },
      });
    } catch (e: any) {
      console.log("[e]", e);
    }
  }

  async findCompanyById(id: string) {
    try {
      const { data } = await db.get(`crud`, {
        params: {
          id,
        },
        headers: {
          app: this.appName,
          action: "FIND_BY_ID",
        },
      });

      const companyData = data.data.data;
      if (!companyData) throw new Error("Company data not found");

      console.log("[findCompanyById]", companyData);
      return companyData;
    } catch (e: any) {
      console.log("[e]", e);
    }
  }

  async findCompanyByOwnerEmail(
    ownerEmail: string
  ): Promise<Company | undefined> {
    try {
      const { data } = await db.get(`crud`, {
        headers: {
          app: this.appName,
          user: ownerEmail,
          action: "LIST",
        },
      });

      const company = data.data.response[0];
      if (!company) return undefined;

      const companyData: Company = { ...company.data, id: company.id };

      return companyData;
    } catch (e: any) {
      console.log("[e]", e);
      return undefined;
    }
  }

  async updateCompany(company: Partial<Company>) {
    console.log("[updating]", company);
    try {
      await db.patch(`crud`, company, {
        headers: {
          app: this.appName,
        },
        params: {
          id: company.id!,
        },
      });
      console.log("[updated]");
    } catch (e: any) {
      console.log("[e]", e);
    }
  }
}

export const repository = new FireStoreRepository();
