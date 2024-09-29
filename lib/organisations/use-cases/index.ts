import {
  Company,
  Currency,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/lib/organisations/entities";
import { repository } from "@/lib/organisations/repositories";

export type CreateTransactionInput = {
  email: string;
  type: TransactionType;
  product: string;
  quantity: number;
  total: number;
  currency?: Currency;
  status?: TransactionStatus;
};

class CompanyServices {
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
  }: CreateTransactionInput): Promise<Transaction> => {
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
  };

  private queryFindCompanyByOwner = async (
    email: string
  ): Promise<Company | void> => {
    return await repository.findCompanyByOwnerEmail(email);
  };

  private queryFindCompanyById = async (
    id: string
  ): Promise<Company | void> => {
    return await repository.findCompanyById(id);
  };

  private querySaveCompany = async (company: Company): Promise<void> => {
    await repository.createCompany({ company });
  };
}

export const companyServices = new CompanyServices();
