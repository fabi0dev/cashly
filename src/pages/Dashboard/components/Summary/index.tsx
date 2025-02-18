import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { GetSummary } from "@/services/finance-overview";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Eye,
  EyeOff,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const Summary = () => {
  const { isLoading: isLoadingSummary, data: dataSummary } = useQuery({
    queryKey: ["finance-summary"],
    queryFn: async () => {
      const { data } = await GetSummary();
      return data;
    },
  });

  const [isVisible, setIsVisible] = useState(true);

  if (isLoadingSummary) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          size="icon"
          onClick={() => setIsVisible(!isVisible)}
          className="text-primary bg-primary/10 hover:bg-primary/20"
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-gray-600">Saldo Total</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {isVisible ? (
              formatCurrency(dataSummary?.totalBalance || 0)
            ) : (
              <ValueHidden />
            )}
          </p>
        </div>

        <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-600">Entradas</h3>
          </div>
          <p className="text-2xl font-semibold text-green-600">
            {isVisible ? (
              formatCurrency(dataSummary?.totalEntries || 0)
            ) : (
              <ValueHidden />
            )}
          </p>
        </div>

        <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-medium text-gray-600">Saídas</h3>
          </div>
          <p className="text-2xl font-semibold text-red-600">
            {isVisible ? (
              formatCurrency(dataSummary?.totalExits || 0)
            ) : (
              <ValueHidden />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const ValueHidden = () => (
  <div className="text-2xl lg:text-3xl p-4 font-semibold bg-gray-100 rounded-sm w-1/2" />
);
