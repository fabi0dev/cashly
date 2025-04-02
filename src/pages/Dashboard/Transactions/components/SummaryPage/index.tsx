import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { GetAllTransactionsResponse } from "@/services/transaction";
import { Receipt, TrendingDown, TrendingUp } from "lucide-react";

interface SummaryPageProps {
  dataTransactions: GetAllTransactionsResponse | undefined;
  isLoadingTransactions: boolean;
}

export const SummaryPage = ({
  dataTransactions,
  isLoadingTransactions,
}: SummaryPageProps) => {
  const totalIncome = dataTransactions?.data.reduce(
    (acc, curr) => acc + (curr.type === "ENTRY" ? curr.amount : 0),
    0
  );
  const totalExpenses = dataTransactions?.data.reduce(
    (acc, curr) => acc + (curr.type === "EXIT" ? curr.amount : 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Soma destas entradas"
        titleClass="text-green-600"
        icon={<TrendingUp className="w-4 h-4" />}
        iconClassName="text-green-600"
      >
        {!isLoadingTransactions && (
          <p className="text-2xl font-semibold mt-2">
            {formatCurrency(totalIncome || 0)}
          </p>
        )}

        {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
      </Card>

      <Card
        title="Soma destas Saídas"
        titleClass="text-red-400"
        icon={<TrendingDown className="w-4 h-4" />}
        iconClassName="text-red-400"
      >
        {!isLoadingTransactions && (
          <p className="text-2xl font-semibold mt-2">
            {formatCurrency(totalExpenses || 0)}
          </p>
        )}

        {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
      </Card>

      <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4" />
          <span className="font-medium">Total de transações</span>
        </div>

        {!isLoadingTransactions && (
          <p className="text-2xl font-semibold mt-2">
            {dataTransactions?.data.length || 0}
          </p>
        )}

        {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
      </div>
    </div>
  );
};
