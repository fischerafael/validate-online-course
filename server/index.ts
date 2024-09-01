interface CompanyUser {
  email: string;
  status: "confirmed" | "pending";
  role: "owner" | "user";
}

type Currency = "usd";

type TransactionType = "debit" | "credit";

type TransactionStatus = "confirmed" | "pending";

interface Transaction {
  id?: string;
  type: TransactionType;
  product: string;
  quantity: number;
  value: number;
  currency: Currency;
  status: TransactionStatus;
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

  public createTransaction = async ({
    ownwerEmail,
    currency,
    product,
    quantity,
    status,
    type,
    value,
  }: {
    ownwerEmail: string;
    type: TransactionType;
    product: string;
    quantity: number;
    value: number;
    currency: Currency;
    status: TransactionStatus;
  }): Promise<Transaction> => {
    const transaction: Transaction = {
      id: new Date().toDateString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currency,
      product,
      quantity,
      status,
      type,
      value,
    };

    const company = await this.createOrFind({ email: ownwerEmail });

    if (!company?.id) throw new Error("Company not found");

    await company.transactions.push(transaction);

    const recentTransaction = await company.transactions.find(
      (trans) => trans.id === transaction.id
    );

    if (!recentTransaction) throw new Error("Transaction failed to be created");

    return recentTransaction;
  };

  private findCompanyByOwnerEmail = async (email: string) => {
    const existingCompany = await this.companies.find((company) =>
      company.users.find(
        (user) => user.role === "owner" && user.email === email
      )
    );

    return existingCompany;
  };

  private saveCompany = async (company: Company) => {
    await this.companies.push(company);
  };
}

export const companyServices = new CompanyServices();
