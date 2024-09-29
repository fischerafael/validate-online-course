export interface CompanyUser {
  email: string;
  status: "confirmed" | "pending";
  role: "owner" | "user";
  avatarUrl?: string;
  name?: string;
  authId?: string;
}

export type Currency = "usd";

export type TransactionType = "debit" | "credit";

export type TransactionStatus = "confirmed" | "pending";

export interface Transaction {
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

export interface Company {
  id?: string;
  users: CompanyUser[];
  transactions: Transaction[];
}
