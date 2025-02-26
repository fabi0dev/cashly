import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { usePagination } from "@/hooks/usePagination";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { ExpenseModal } from "@/shared/Modals/ExpenseModal";
import { ExpenseItem } from "./components/ExpenseItem";
import { ExpenseFilters } from "./components/ExpenseFilters";
import { useFilters } from "@/hooks/useFilters";
import {
  schemaExpenseFilters,
  SchemaExpenseFilters,
} from "./components/ExpenseFilters/schema";

export const ExpenseList = () => {
  const { currentPage, limit } = usePagination();
  const { filteredParams } = useFilters<SchemaExpenseFilters>({
    schema: schemaExpenseFilters,
  });

  const { isLoading: isLoadingTransactions, data: dataTransactions } = useQuery(
    {
      ...queries.expenseInstallments.getAll({
        limit: limit,
        page: currentPage,
        ...filteredParams,
      }),
    }
  );

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Container
      titleHeader="Lista de Despesas"
      rightContentHeader={
        <Button onClick={() => setShowExpenseModal(true)}>
          <span className="hidden sm:inline">Nova Despesa</span>
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <div className="flex justify-end py-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <ExpenseFilters onClose={() => setShowFilters(false)} />
          )}

          <List
            columns={[
              {
                label: "Descrição",
              },

              {
                label: "Vencimento",
              },
              {
                label: "Valor",
              },
              {
                label: "",
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
            render={(expense) => <ExpenseItem installment={expense} />}
            renderEmpty={() => (
              <EmptyPlaceholder
                src="/ui/graphy.png"
                description="Crie uma despesa para começar"
              />
            )}
          />
        </div>
      </div>

      {showExpenseModal && (
        <ExpenseModal isOpen onClose={() => setShowExpenseModal(false)} />
      )}
    </Container>
  );
};
