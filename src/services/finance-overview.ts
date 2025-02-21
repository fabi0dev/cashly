import { Api } from "./api";

export const GetSummary = () =>
  Api().get<GetSummaryResponse>(`/finance-overview/summary`);

export const GetExpenseDistribution = (params: GetExpenseDistributionRequest) =>
  Api().get<GetExpenseDistributionResponse[]>(
    `/finance-overview/expense-distribution`,
    { params }
  );

interface GetSummaryResponse {
  totalBalance: number;
  totalExits: number;
  totalEntries: number;
}

export interface GetExpenseDistributionRequest {
  lastDays?: number;
}
interface GetExpenseDistributionResponse {
  category: string;
  amount: number;
}
