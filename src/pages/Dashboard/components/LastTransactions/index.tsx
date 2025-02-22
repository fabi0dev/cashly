import { Skeleton } from "@/components/ui/skeleton";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { LastTransactionsItem } from "./components/LastTransactionsItem";

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
          dataLastTransactions?.data.map((transaction) => (
            <LastTransactionsItem
              key={transaction.id}
              transaction={transaction}
            />
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
