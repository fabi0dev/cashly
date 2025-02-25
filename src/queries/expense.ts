import {
  GetAllExpenses,
  GetAllExpensesRequest,
  GetExpenseById,
} from "@/services/expense";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllExpensesQuery = GetAllExpensesRequest;
type GetExpenseById = { expenseId: string };

export const expense = createQueryKeys("expense", {
  getAll: (query: GetAllExpensesQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllExpenses(query);
      return data;
    },
  }),
  getById: (query: GetExpenseById) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetExpenseById(query.expenseId);
      return data;
    },
  }),
});
