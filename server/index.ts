interface CompanyUser {
  email: string;
  status: "confirmed" | "pending";
  role: "owner" | "user";
}

interface Transaction {
  type: "debit" | "credit";
  cost: number;
  currency: "usd";
  status: "confirmed" | "pending";
  product?: string;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id?: string;
  users: CompanyUser[];
  transactions: Transaction[];
}

class CompanyServices {
  private companies: Company[] = [];

  public createOrFind = async ({
    email,
  }: {
    email: string;
  }): Promise<Company | undefined> => {
    const existingCompany = await this.findCompanyByOwnerEmail(email);
    if (existingCompany) {
      console.log("[existing company]", existingCompany);
      return existingCompany;
    }

    const company: Company = {
      transactions: [],
      users: [
        {
          email: email,
          role: "owner",
          status: "confirmed",
        },
      ],
      id: new Date().toISOString(),
    };

    await this.saveCompany(company);

    const newCompany = await this.findCompanyByOwnerEmail(email);

    console.log("new company]", newCompany);
    return newCompany;
  };

  private findCompanyByOwnerEmail = async (email: string) => {
    const recentCompany = await this.companies.find((company) =>
      company.users.find(
        (user) => user.role === "owner" && user.email === email
      )
    );

    return recentCompany;
  };

  private saveCompany = async (company: Company) => {
    await this.companies.push(company);
  };
}

export const companyServices = new CompanyServices();
