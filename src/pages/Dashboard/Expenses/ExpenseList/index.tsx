import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Filter, ListFilter } from "lucide-react";
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
import { SummaryPage } from "./components/SummaryPage";
import { formatCurrency } from "@/lib/utils";

export const ExpenseList = () => {
  const { currentPage, limit } = usePagination();
  const { filteredParams } = useFilters<SchemaExpenseFilters>({
    schema: schemaExpenseFilters,
  });

  const { isLoading: isLoadingInstallments, data: dataInstallments } = useQuery(
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
  const [showSummary, setShowSummary] = useState(false);

  const totalSum =
    dataInstallments?.data.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <Container
      titleHeader="Lista de Despesas"
      rightContentHeader={
        <Button onClick={() => setShowExpenseModal(true)}>Nova Despesa</Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <div className="flex justify-end py-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setShowSummary(!showSummary)}
            >
              <ListFilter className="w-5 h-5" />
              Resumo
            </Button>

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

          {showSummary && (
            <SummaryPage
              dataInstallments={dataInstallments}
              isLoadingTransactions={isLoadingInstallments}
            />
          )}

          <List
            columns={[
              {
                label: "Vencimento",
              },
              {
                label: "Valor",
              },
              {
                label: "Situação",
              },

              {
                label: "Descrição",
              },

              {
                label: "",
                className: "w-[100px]",
              },
            ]}
            pagination={{
              totalItems: dataInstallments?.totalItems || 0,
              totalPages: dataInstallments?.totalPages || 0,
            }}
            isLoading={isLoadingInstallments}
            data={dataInstallments?.data || []}
            render={(expense) => <ExpenseItem installment={expense} />}
            renderEmpty={() => (
              <EmptyPlaceholder
                src="/ui/graphy.png"
                description="Crie uma despesa para começar"
              />
            )}
            renderExtraRow={() => (
              <List.Row className="pt-1">
                <List.Td></List.Td>
                <List.Td className="col-span-4 dark:text-gray-400 ">
                  {formatCurrency(totalSum)}
                </List.Td>
              </List.Row>
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
