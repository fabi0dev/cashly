import { useState } from "react";
import { PieChart, Plus } from "lucide-react";
import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Summary } from "./components/Summary";
import { LastTransactions } from "./components/LastTransactions";

export const Dashboard = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <Container
      titleHeader="Visão geral"
      rightContentHeader={
        <Button onClick={() => setShowTransactionModal(true)}>
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
          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5" />
              <h2 className="font-medium">Distribuição de Gastos</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Gráfico de distribuição de gastos
            </div>
          </div>

          {/* Recent Transactions */}
          <LastTransactions />
        </div>
      </div>
    </Container>
  );
};
