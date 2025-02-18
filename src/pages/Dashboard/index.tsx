import { useState } from "react";
import { PieChart, Calendar, Plus } from "lucide-react";
import { Container } from "@/components/Container";
import { formatToDateRelative } from "@/lib/date";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Summary } from "./components/Summary";

export const Dashboard = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <Container
      titleHeader="Visão geral"
      rightContentHeader={
        <Button
          onClick={() => setShowTransactionModal(true)}
          className="flex items-center gap-2 bg-purple-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-white ml-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      }
    >
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        <Summary />

        {/* Charts and Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5" />
              <h2 className="font-medium text-gray-900">
                Distribuição de Gastos
              </h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Gráfico de distribuição de gastos
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5" />
              <h2 className="font-medium text-gray-900">Últimas Transações</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  type: "expense",
                  description: "Supermercado",
                  amount: -350,
                  date: "2024-03-15",
                },
                {
                  type: "income",
                  description: "Salário",
                  amount: 3000,
                  date: "2024-03-10",
                },
                {
                  type: "expense",
                  description: "Netflix",
                  amount: -39.9,
                  date: "2024-03-05",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatToDateRelative(transaction.date)}
                    </p>
                  </div>
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type !== "income" && "-"}
                    R$ {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
