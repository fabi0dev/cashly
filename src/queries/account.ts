import { GetAllAccounts, GetAllAccountsRequest } from "@/services/account";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetAllAccountsQuery = GetAllAccountsRequest;

export const account = createQueryKeys("account", {
  getAll: (query: GetAllAccountsQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetAllAccounts(query);

      return data;
    },
  }),
});
