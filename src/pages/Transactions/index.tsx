import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { TransactionItem } from "./components/TransactionItem";
import { Skeleton } from "@/components/ui/skeleton";

export const Transactions = () => {
  const { isLoading: isLoadingTransactions, data: dataTransactions } = useQuery(
    {
      ...queries.transaction.getAll({
        limit: 200,
      }),
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
      titleHeader="Lista de Transações"
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
              <span className="font-medium">Soma destas entradas</span>
            </div>
            {!isLoadingTransactions && (
              <p className="text-2xl font-semibold mt-2">
                {formatCurrency(totalIncome || 0)}
              </p>
            )}

            {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
          </div>

          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="font-medium">Soma destas Saídas</span>
            </div>
            {!isLoadingTransactions && (
              <p className="text-2xl font-semibold mt-2">
                {formatCurrency(totalExpenses || 0)}
              </p>
            )}

            {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
          </div>

          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              <span className="font-medium">Total de transações</span>
            </div>

            {!isLoadingTransactions && (
              <p className="text-2xl font-semibold mt-2">
                {dataTransactions?.data.length || 0}
              </p>
            )}

            {isLoadingTransactions && <Skeleton className="h-8 mt-2 w-1/2" />}
          </div>
        </div>

        <div>
          <div className="flex justify-end py-2">
            <Button variant={"ghost"} size={"icon"}>
              <Filter />
            </Button>
          </div>
          <List
            columns={[
              {
                label: "Data",
              },
              {
                label: "Conta do Banco",
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
