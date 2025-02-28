import { SystemConfig } from "@/constants/SystemConfig";
import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllExpenses = (params: GetAllExpensesRequest) =>
  Api().get<GetAllExpensesResponse>("/expense", {
    params: {
      ...params,
      limit: params.limit || SystemConfig.list.defaultLimit,
      page: params.page || 1,
    },
  });

export const GetExpenseById = (expenseId: string) =>
  Api().get<GetExpenseByIdResponse>(`/expense/${expenseId}`);

export const CreateExpense = (data: ExpenseCreateRequest) =>
  Api().post<Expense>("/expense", data);

export const UpdateExpense = (expenseId: string, data: ExpenseUpdateRequest) =>
  Api().put<Expense>(`/expense/${expenseId}`, data);

export const DeleteExpense = (expenseId: string) =>
  Api().delete<Expense>(`/expense/${expenseId}`);

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  date: string;
  dueDate: string;
  isPaid: boolean;
  description?: string;
  isRecurring: boolean;
  recurrenceType?: string | null;
  recurrenceEndDate?: string | null;

  category?: {
    id: string;
    name: string;
  };
}

export type GetAllExpensesRequest = RequestPagination & {};

export interface GetAllExpensesResponse {
  data: Expense[];
  totalItems: number;
  totalPages: number;
}

interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  paymentDate?: Date | null;
  installmentNumber: number;
  totalInstallments: number;
  isPaid: boolean;
}

export type GetExpenseByIdResponse = Expense & {
  installments: Installment[];
};

export type RecurrenceType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export interface ExpenseCreateRequest {
  categoryId: string;
  amount: number;
  date?: string;
  dueDate: string;
  isPaid?: boolean;
  description?: string;
  isRecurring?: boolean;
  installments?: number;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: string;
}

export type ExpenseUpdateRequest = ExpenseCreateRequest;
