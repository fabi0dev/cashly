import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Eye,
  EyeOff,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { queries } from "@/queries";
import { Card } from "@/components/Card";
import { DateTime } from "luxon";
import { ValueHidden } from "./components/ValueHidden";

export const Summary = () => {
  const { isLoading: isLoadingSummary, data: dataSummary } = useQuery({
    ...queries.financeOverview.getSummary(),
  });

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          size="icon"
          variant={"ghost"}
          className="bg-gray-100 dark:bg-gray-800"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Saldo disponível"
          icon={<DollarSign className="w-5 h-5 dark:text-green-500" />}
        >
          {!isLoadingSummary && (
            <p className="text-2xl font-semibold">
              {isVisible ? (
                formatCurrency(dataSummary?.totalBalance || 0)
              ) : (
                <ValueHidden />
              )}
            </p>
          )}
          {isLoadingSummary && <Skeleton className="h-8 w-1/2" />}
        </Card>

        <Card
          title="Entradas"
          subtitle={DateTime.now().setLocale("pt-BR").toFormat("MMMM/yyyy")}
          icon={<TrendingUp className="w-5 h-5 dark:text-green-500" />}
          iconClassName="bg-green-50 dark:bg-green-100/20"
        >
          {!isLoadingSummary && (
            <p className="text-2xl font-semibold text-green-600">
              {isVisible ? (
                formatCurrency(dataSummary?.totalEntries || 0)
              ) : (
                <ValueHidden />
              )}
            </p>
          )}

          {isLoadingSummary && <Skeleton className="h-8 w-1/2" />}
        </Card>

        <Card
          title="Saídas"
          subtitle={DateTime.now().setLocale("pt-BR").toFormat("MMMM/yyyy")}
          icon={
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
          }
          iconClassName="dark:bg-red-400/10"
        >
          {!isLoadingSummary && (
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {isVisible ? (
                formatCurrency(dataSummary?.totalExits || 0)
              ) : (
                <ValueHidden />
              )}
            </p>
          )}

          {isLoadingSummary && <Skeleton className="h-8 w-1/2" />}
        </Card>
      </div>
    </div>
  );
};
