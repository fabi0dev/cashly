import {
  GetAllTransactions,
  GetAllTransactionsRequest,
} from "@/services/transaction";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllTransactionsQuery = GetAllTransactionsRequest;

export const transaction = createQueryKeys("transaction", {
  getAll: (query: GetAllTransactionsQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllTransactions(query);

      return data;
    },
  }),
});
