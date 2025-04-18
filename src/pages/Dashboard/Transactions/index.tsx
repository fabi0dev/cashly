import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { TransactionItem } from "./components/TransactionItem";
import { usePagination } from "@/hooks/usePagination";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { SummaryPage } from "./components/SummaryPage";

export const Transactions = () => {
  const { currentPage, limit } = usePagination();
  const { isLoading: isLoadingTransactions, data: dataTransactions } = useQuery(
    {
      ...queries.transaction.getAll({
        limit: limit,
        page: currentPage,
      }),
    }
  );

  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <Container
      titleHeader="Lista de Transações"
      rightContentHeader={
        <Button onClick={() => setShowTransactionModal(true)}>
          <TrendingUp className="w-4 h-4" />
          Nova Entrada
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {dataTransactions && dataTransactions?.totalItems > 0 && (
          <SummaryPage
            dataTransactions={dataTransactions}
            isLoadingTransactions={isLoadingTransactions}
          />
        )}

        <div>
          {/* {dataTransactions && dataTransactions?.totalItems > 0 && (
            <div className="flex justify-end py-2">
              <Button variant="ghost" className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </Button>
            </div>
          )} */}

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
              {
                label: "",
              },
            ]}
            pagination={{
              totalItems: dataTransactions?.totalItems || 0,
              totalPages: dataTransactions?.totalPages || 0,
            }}
            isLoading={isLoadingTransactions}
            data={dataTransactions?.data || []}
            render={(transaction) => (
              <TransactionItem transaction={transaction} />
            )}
            renderEmpty={() => (
              <EmptyPlaceholder
                src="/ui/exchange.png"
                description="Crie uma transação para começar"
              />
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
