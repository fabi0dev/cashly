import { Api } from "./api";

export const GetSummary = () =>
  Api().get<GetSummaryResponse>(`/finance-overview/summary`);

interface GetSummaryResponse {
  totalBalance: number;
  totalExits: number;
  totalEntries: number;
}
