import {
  GetExpenseDistribution,
  GetExpenseDistributionRequest,
  GetSummary,
} from "@/services/finance-overview";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetExpenseDistributionQuery = GetExpenseDistributionRequest;

export const financeOverview = createQueryKeys("financeOverview", {
  getSummary: () => ({
    queryKey: [undefined],
    queryFn: async () => {
      const { data } = await GetSummary();

      return data;
    },
  }),
  getExpenseDistribution: (query: GetExpenseDistributionQuery = {}) => ({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await GetExpenseDistribution(query);

      return data;
    },
  }),
});
