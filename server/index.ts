import { db } from "./config/axios";

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
    const existingCompany = await this.queryFindCompanyByOwner(email);
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
      // id: this.utilGenerateId(),
    };
    console.log("[createOrFind][company]", company);

    await this.querySaveCompany(company);

    const newCompany = await this.queryFindCompanyByOwner(email);
    if (!newCompany) throw new Error("Something went wrong creating comapny");

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
      id: this.utilGenerateId(),
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

    company.transactions.push(transaction);
    console.log("[createTransaction][transaction added]", company);

    await repository.updateCompany(company);

    const recentTransaction = company.transactions.find(
      (trans) => trans.id === transaction.id
    );
    console.log("[ccreateTransactionompany][recentTransaction]", company);

    if (!recentTransaction) throw new Error("Transaction failed to be created");

    return recentTransaction;
  };

  public confirmTransaction = async ({
    companyId,
    transactionId,
  }: {
    companyId: string;
    transactionId: string;
  }) => {
    const company = await this.queryFindCompanyById(companyId);
    console.log("[company]", company);

    if (!company) throw new Error("Company Not Found");

    const transaction = company.transactions.find(
      (tr) => tr.id === transactionId
    );
    if (!transaction) throw new Error("Transaction Not Found");

    const updatedCompany: Company = {
      ...company,
      transactions: company.transactions.map((tr) => {
        if (tr.id === transactionId) {
          return { ...tr, status: "confirmed" };
        }
        return tr;
      }),
    };

    await this.queryUpdateCompany(updatedCompany);
  };

  private utilGenerateId = () => {
    return new Date().getTime().toString();
  };

  private queryUpdateCompany = async (company: Company) => {
    await repository.updateCompany(company);
    return;
    const updatedCompanies = this.companies.map((c) => {
      if (c.id === company.id) {
        return company;
      }
      return c;
    });
    this.companies = updatedCompanies;
  };

  private queryFindCompanyByOwner = async (
    email: string
  ): Promise<Company | void> => {
    return await repository.findCompanyByOwnerEmail(email);
    const existingCompany = await this.companies.find((company) =>
      company.users.find(
        (user) => user.role === "owner" && user.email === email
      )
    );
    return existingCompany;
  };

  private queryFindCompanyById = async (
    id: string
  ): Promise<Company | void> => {
    console.log("[companyById ID]", id);
    const company = await repository.findCompanyById(id);
    console.log("[companyById]", company);
    return company;
    const existingCompany = await this.companies.find(
      (company) => company.id === id
    );

    return existingCompany;
  };

  private querySaveCompany = async (company: Company): Promise<void> => {
    await repository.createCompany({ company });
    // await this.companies.push(company);
  };
}

export const companyServices = new CompanyServices();

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
