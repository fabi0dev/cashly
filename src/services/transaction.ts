import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllTransactions = (params: GetAllTransactionsRequest) =>
  Api().get<GetAllTransactionsResponse>(`/transaction`, {
    params,
  });

export const CreateTransaction = (data: TransactionCreateRequest) =>
  Api().post<Transaction>(`/transaction`, data);

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

export type GetAllTransactionsRequest = RequestPagination & {};

export interface GetAllTransactionsResponse {
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
