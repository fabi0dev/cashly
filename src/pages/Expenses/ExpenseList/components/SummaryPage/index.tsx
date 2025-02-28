import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { GetAllExpensesInstallmentsResponse } from "@/services/expense-installments";
import { Receipt, TrendingDown } from "lucide-react";

interface SummaryPageProps {
  dataInstallments: GetAllExpensesInstallmentsResponse | undefined;
  isLoadingTransactions: boolean;
}

export const SummaryPage = ({
  dataInstallments,
  isLoadingTransactions,
}: SummaryPageProps) => {
  const totalSum =
    dataInstallments?.data.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <Card
        title="Soma destes valores"
        icon={<TrendingDown className="w-4 h-4" />}
        iconClassName="text-purple-400"
        subtitle="Deste mês"
        paddingLeft
      >
        <span className="text-xl">{formatCurrency(totalSum)} </span>
        {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
      </Card>

      <Card title="Total de despesas" icon={<Receipt className="w-4 h-4" />}>
        {!isLoadingTransactions && (
          <span className="text-xl">{dataInstallments?.data.length || 0}</span>
        )}

        {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
      </Card>
    </div>
  );
};
