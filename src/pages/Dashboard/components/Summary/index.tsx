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
          className="dark: bg-gray-800"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100">
              <DollarSign className="w-5 h-5 dark:text-green-700" />
            </div>
            <h3 className="font-medium">Saldo Total</h3>
          </div>

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
        </div>

        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-100">
              <TrendingUp className="w-5 h-5 dark:text-green-700" />
            </div>
            <h3 className="font-medium">Entradas</h3>
          </div>
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
        </div>

        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-medium">Saídas</h3>
          </div>
          {!isLoadingSummary && (
            <p className="text-2xl font-semibold text-red-600">
              {isVisible ? (
                formatCurrency(dataSummary?.totalExits || 0)
              ) : (
                <ValueHidden />
              )}
            </p>
          )}

          {isLoadingSummary && <Skeleton className="h-8 w-1/2" />}
        </div>
      </div>
    </div>
  );
};

const ValueHidden = () => (
  <div className="text-2xl lg:text-3xl p-4 font-semibold bg-gray-50 rounded-sm w-1/2" />
);
