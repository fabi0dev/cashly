import {
  GetAllTransactions,
  GetAllTransactionsRequest,
  GetTransactionById,
} from "@/services/transaction";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllTransactionsQuery = GetAllTransactionsRequest;
type GetTransactionById = { transactionId: string };

export const transaction = createQueryKeys("transaction", {
  getAll: (query: GetAllTransactionsQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllTransactions(query);

      return data;
    },
  }),
  getById: (query: GetTransactionById) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetTransactionById(query.transactionId);

      return data;
    },
  }),
});
