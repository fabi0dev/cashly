import {
  GetAccountById,
  GetAllAccounts,
  GetAllAccountsRequest,
} from "@/services/account";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllAccountsQuery = GetAllAccountsRequest;
type GetAccountById = { accountId: string };

export const account = createQueryKeys("account", {
  getAll: (query: GetAllAccountsQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllAccounts(query);

      return data;
    },
  }),

  getById: (query: GetAccountById) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAccountById(query.accountId);

      return data;
    },
  }),
});
