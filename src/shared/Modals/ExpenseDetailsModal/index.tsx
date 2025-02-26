import { Dialog } from "@/components/Dialog";
import { Divider } from "@/components/Divider";
import { formatToDateString } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Tag } from "lucide-react";

interface ExpenseModalProps {
  expenseId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpenseDetailsModal({
  expenseId,
  isOpen,
  onClose,
}: ExpenseModalProps) {
  const { data: dataExpense, isFetching: isLoadingTransaction } = useQuery({
    ...queries.expense.getById({ expenseId: expenseId! }),
    enabled: !!expenseId,
  });

  return (
    <Dialog
      title={"Detalhes da despesa"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingTransaction}
    >
      <div className="mb-6 space-y-5">
        <div className="mb-8">
          <p className={`text-3xl font-bold dark:text-gray-300`}>
            {formatCurrency(dataExpense?.amount || 0)}
          </p>
        </div>

        <div className="space-y-1">
          {dataExpense?.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Descrição
              </h3>
              <p>{dataExpense?.description}</p>
            </div>
          )}

          {dataExpense?.category && (
            <>
              <Divider />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Categoria
                </h3>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span>{dataExpense?.category.name}</span>
                </div>
              </div>
            </>
          )}

          <Divider />

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Data</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="capitalize">
                  {formatToDateString(dataExpense?.date || "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
