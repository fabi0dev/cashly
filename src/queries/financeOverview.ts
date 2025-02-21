import { GetSummary } from "@/services/finance-overview";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const financeOverview = createQueryKeys("financeOverview", {
  getSummary: () => ({
    queryKey: [undefined],
    queryFn: async () => {
      const { data } = await GetSummary();

      return data;
    },
  }),
});
