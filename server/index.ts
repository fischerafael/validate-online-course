interface CompanyUser {
  email: string;
  status: "confirmed" | "pending";
  role: "owner" | "user";
}

export type Currency = "usd";

export type TransactionType = "debit" | "credit";

export type TransactionStatus = "confirmed" | "pending";

interface Transaction {
  id?: string;
  type: TransactionType;
  product: string;
  quantity: number;
  total: number;
  currency: Currency;
  status: TransactionStatus;
  purchasedBy: string;
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
      console.log("[createOrFind][existingCompany]", existingCompany);
      return existingCompany;
    }

    console.log("[createOrFind][email]", email);

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
    console.log("[createOrFind][company]", company);

    await this.saveCompany(company);

    const newCompany = await this.findCompanyByOwnerEmail(email);

    console.log("new company]", newCompany);
    return newCompany;
  };

  public createTransaction = async ({
    email,
    currency = "usd",
    product,
    quantity,
    status = "pending",
    type,
    total,
  }: {
    email: string;
    type: TransactionType;
    product: string;
    quantity: number;
    total: number;
    currency?: Currency;
    status?: TransactionStatus;
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
      total,
      purchasedBy: email,
    };

    const company = await this.createOrFind({ email: email });
    console.log("[createTransaction][company]", company);

    if (!company?.id) throw new Error("Company not found");

    await company.transactions.push(transaction);
    console.log("[createTransaction][transaction added]", company);

    const recentTransaction = await company.transactions.find(
      (trans) => trans.id === transaction.id
    );
    console.log("[ccreateTransactionompany][recentTransaction]", company);

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
