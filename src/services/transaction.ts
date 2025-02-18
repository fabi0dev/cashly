import { Api } from "./api";

export const GetAllTransactions = () =>
  Api().get<TransactionResponse>(`/transaction`);

export const CreateTransaction = (data: TransactionCreateRequest) =>
  Api().post<TransactionResponse>(`/transaction`, data);

export interface Transaction {
  id: string;
  amount: number;
  type: "ENTRY" | "EXIT";
  date: string;
  description?: string;
  category: string;
  userId: string;
  accountId: string | null;
}

export interface TransactionResponse {
  data: Transaction[];
  totalItems: number;
  totalPages: number;
}

export interface TransactionCreateRequest {
  amount: number;
  type: "ENTRY" | "EXIT";
  date: string;
  description?: string;
  category: string;
}
