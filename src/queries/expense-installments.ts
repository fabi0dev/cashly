import {
  GetAllExpensesInstallments,
  GetAllExpensesInstallmentsRequest,
} from "@/services/expense-installments";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllExpensesInstallmentsQuery = GetAllExpensesInstallmentsRequest;

export const expenseInstallments = createQueryKeys("expenseInstallments", {
  getAll: (query: GetAllExpensesInstallmentsQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllExpensesInstallments(query);
      return data;
    },
  }),
});
