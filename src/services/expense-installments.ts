import { SystemConfig } from "@/constants/SystemConfig";
import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllExpensesInstallments = (
  params: GetAllExpensesInstallmentsRequest
) =>
  Api().get<GetAllExpensesInstallmentsResponse>("/expense-installments", {
    params: {
      ...params,
      limit: params.limit || SystemConfig.list.defaultLimit,
      page: params.page || 1,
    },
  });

type ExpenseInstallmentCategory = {
  id: string;
  name: string;
};
export interface ExpenseInstallment {
  id: string;
  expenseId: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  installmentNumber: number;
  totalInstallments: number;
  isPaid: boolean;
  description: string;

  category?: ExpenseInstallmentCategory | null;
}

export type GetAllExpensesInstallmentsRequest = RequestPagination & {
  description?: string;
  dueDateStart?: string;
  dueDateEnd?: string;
};

interface GetAllExpensesInstallmentsResponse {
  data: ExpenseInstallment[];
  totalItems: number;
  totalPages: number;
}
