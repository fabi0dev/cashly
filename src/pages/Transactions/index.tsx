import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { TransactionItem } from "./components/TransactionItem";

export const Transactions = () => {
  const { isLoading: isLoadingTransactions, data: dataTransactions } = useQuery(
    {
      ...queries.transaction.getAll(),
    }
  );

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const totalIncome = dataTransactions?.data.reduce(
    (acc, curr) => acc + (curr.type === "ENTRY" ? curr.amount : 0),
    0
  );
  const totalExpenses = dataTransactions?.data.reduce(
    (acc, curr) => acc + (curr.type === "EXIT" ? curr.amount : 0),
    0
  );

  return (
    <Container
      titleHeader="Relatório de Transações"
      rightContentHeader={
        <Button onClick={() => setShowTransactionModal(true)}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Soma de entradas</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {formatCurrency(totalIncome || 0)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="font-medium">Soma de Saídas</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {formatCurrency(totalExpenses || 0)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              <span className="font-medium">Total de transações</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {dataTransactions?.data.length || 0}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <List
            columns={[
              {
                label: "Data",
              },
              {
                label: "Descrição",
              },
              {
                label: "Categoria",
              },
              {
                label: "Valor",
              },
            ]}
            isLoading={isLoadingTransactions}
            data={dataTransactions?.data || []}
            render={(transaction) => (
              <TransactionItem transaction={transaction} />
            )}
          />
        </div>
      </div>

      {showTransactionModal && (
        <TransactionModal
          isOpen
          onClose={() => setShowTransactionModal(false)}
        />
      )}
    </Container>
  );
};
