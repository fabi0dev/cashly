import { useTheme } from "@/hooks/useTheme";
import { cn, formatCurrency } from "@/lib/utils";
import { PieChart } from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";

const data = [
  {
    name: "Janeiro",
    entry: 590,
    exit: 800,
  },
  {
    name: "Fevereiro",
    entry: 868,
    exit: 967,
  },
  {
    name: "Março",
    entry: 1397,
    exit: 1098,
  },
  {
    name: "Abril",
    entry: 1480,
    exit: 1200,
    amt: 1228,
  },
  {
    name: "Maio",
    entry: 1520,
    exit: 1108,
  },
  {
    name: "Junho",
    entry: 1400,
    exit: 680,
  },
];

export const OverviewFinances = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-5 h-5" />
        <h2 className="font-medium">Distribuição de Gastos</h2>
      </div>

      <ResponsiveContainer width="100%" height="100%" className={"flex flex-1"}>
        <ComposedChart
          layout="vertical"
          width={500}
          height={500}
          data={data}
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
            dataKey="name"
            type="category"
            scale="band"
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
          <Area
            dataKey="entry"
            name={"Entradas"}
            fill={currentTheme === "dark" ? "#ccc" : "#add29c"}
            stroke="#c0d6b6"
          />
          <Bar
            dataKey="exit"
            name={"Saídas"}
            barSize={20}
            className={cn(
              currentTheme === "dark"
                ? "stroke-gray-500"
                : "stroke-gray-300/90",

              currentTheme === "dark" ? "fill-gray-500" : "fill-gray-200"
            )}
            radius={[0, 7, 7, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
