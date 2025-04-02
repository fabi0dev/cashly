import { Spinner } from "@/components/Spinner";
import { useTheme } from "@/hooks/useTheme";
import { cn, formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

export const DistributionExpenses = () => {
  const { currentTheme } = useTheme();

  const {
    data: dataExpenseDistribution,
    isLoading: isloadingExpenseDistribution,
  } = useQuery({
    ...queries.financeOverview.getExpenseDistribution(),
  });

  const dataChart = dataExpenseDistribution
    ?.map((item) => ({
      name: item.category,
      amount: item.amount,
    }))
    .slice(0, 5);

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors"
      )}
    >
      <div className="flex flex-row gap-3 items-center">
        <PieChart className="w-5 h-5" />
        <div className="flex flex-col">
          <h2 className="font-medium">Distribuição de Gastos</h2>
          <div className="text-xs text-gray-400 font-medium">
            Últimos 30 dias
          </div>
        </div>
      </div>

      {dataChart && dataChart?.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            data={dataChart}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              type="number"
              tickFormatter={(value) => formatCurrency(value)}
              style={{
                fontSize: 14,
              }}
              tick={{ fill: "#ccc" }}
            />
            <YAxis
              interval={0}
              dataKey="name"
              type="category"
              scale="auto"
              style={{
                fontSize: 14,
              }}
              tick={{ fill: "#ccc" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(10px)",
                borderRadius: 10,
                border: "none",
              }}
              labelStyle={{ color: "#fff", fontSize: 14 }}
              itemStyle={{ color: "#fff", fontSize: 14 }}
              formatter={(value, name) => {
                return [formatCurrency(Number(value)), name];
              }}
            />

            <Bar
              dataKey="amount"
              name={"Gastos"}
              barSize={20}
              className={cn(
                currentTheme === "dark"
                  ? "stroke-gray-800"
                  : "stroke-gray-300/90",

                currentTheme === "dark" ? "fill-gray-600" : "fill-gray-200"
              )}
              radius={[0, 7, 7, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}

      {dataChart && dataChart?.length === 0 && (
        <div className="flex flex-1 justify-center p-5 text-gray-500">
          Nenhum dado para mostrar
        </div>
      )}

      {isloadingExpenseDistribution && (
        <div className="flex flex-1 items-center justify-center p-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};
