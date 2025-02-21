import { Skeleton } from "@/components/ui/skeleton";
import { formatDateLabel } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

export const LastTransactions = () => {
  const limit = 3;

  const { data: dataLastTransactions, isLoading: isLoadingLastTransactions } =
    useQuery({
      ...queries.transaction.getAll({
        page: 1,
        limit,
      }),
    });

  return (
    <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5" />
        <h2 className="font-medium">Últimas Transações</h2>
      </div>
      <div className="space-y-3">
        {!isLoadingLastTransactions &&
          dataLastTransactions?.data.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-medium">
                  {transaction.description || transaction.category}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateLabel(transaction.date)}
                </p>
              </div>
              <p
                className={`font-medium ${
                  transaction.type === "ENTRY"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type !== "ENTRY" && "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
      </div>

      {isLoadingLastTransactions &&
        Array.from({ length: limit }).map((_, index) => (
          <Skeleton
            key={index}
            className="flex items-center justify-center py-6 rounded-xl mb-2"
          />
        ))}
    </div>
  );
};
