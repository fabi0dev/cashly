import { SystemConfig } from "@/constants/SystemConfig";
import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllTransactions = (params: GetAllTransactionsRequest) =>
  Api().get<GetAllTransactionsResponse>(`/transaction`, {
    params: {
      ...params,
      limit: params.limit || SystemConfig.list.defaultLimit,
      page: params.page || 1,
    },
  });

export const GetTransactionById = (transactionId: string) =>
  Api().get<Transaction>(`/transaction/${transactionId}`);

export const CreateTransaction = (data: TransactionCreateRequest) =>
  Api().post<Transaction>(`/transaction`, data);

export const UpdateTransaction = (
  transactionId: string,
  data: TransactionUpdateRequest
) => Api().put<Transaction>(`/transaction/${transactionId}`, data);

export const DeleteTransaction = (transactionId: string) =>
  Api().delete<Transaction>(`/transaction/${transactionId}`);

type TransactionAccount = {
  id: string;
  name: string;
};

type TransactionCategory = {
  id: string;
  name: string;
};

export interface Transaction {
  id: string;
  amount: number;
  type: "ENTRY" | "EXIT";
  date: string;
  description?: string;
  categoryId: string;
  expenseId?: string;
  userId: string;
  accountId: string;
  accountBalance: number;
  account: TransactionAccount;
  category?: TransactionCategory;
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
  categoryId: string;
}

export type TransactionUpdateRequest = TransactionCreateRequest;
