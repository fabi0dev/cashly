import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { formatToDateString } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { ExpenseModal } from "@/shared/Modals/ExpenseModal";
import { useExpenseItem } from "./useExpenseItem";
import { ExpenseDetailsModal } from "@/shared/Modals/ExpenseDetailsModal";
import { ExpenseInstallment } from "@/services/expense-installments";
import { Badge } from "@/components/ui/badge";

interface ExpenseItemProps {
  installment: ExpenseInstallment;
}

export const ExpenseItem = ({ installment }: ExpenseItemProps) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConfirmDeleteExpense, setShowConfirmDeleteExpense] =
    useState(false);

  const [showExpenseDetails, setShowExpenseDetails] = useState(false);

  const { mutateDeleteExpense, isLoadingDeleteExpense } = useExpenseItem({
    stateModal: setShowConfirmDeleteExpense,
  });

  return (
    <>
      <List.Row>
        <List.Td className="text-gray-600">
          {formatToDateString(installment.dueDate)}
        </List.Td>

        <List.Td className="text-gray-900">
          {formatCurrency(installment.amount)}
        </List.Td>

        <List.Td className="text-gray-900">
          <Badge
            className={cn(
              !installment.isPaid &&
                "bg-yellow-500/20 text-yellow-700 dark:text-yellow-500",
              installment.isPaid &&
                "bg-green-600/20 text-green-700 dark:text-green-400"
            )}
          >
            {installment.isPaid ? "Pago" : "A pagar"}
          </Badge>
        </List.Td>

        <List.Td className="text-gray-900 gap-2">
          {installment.description}

          {installment.category && (
            <Badge className="bg-gray-100/50">
              {installment.category?.name}
            </Badge>
          )}
        </List.Td>

        <List.Td className="gap-2">
          {installment.totalInstallments > 1 && (
            <div className="flex flex-row p-1 px-2 bg-violet-500/50 rounded-full text-xs">
              {installment.installmentNumber}/{installment.totalInstallments}
            </div>
          )}
        </List.Td>

        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Detalhes da despesa",
                onClick: () => setShowExpenseDetails(true),
              },
              {
                label: "Editar",
                onClick: () => setShowTransactionModal(true),
              },
              {
                label: "Excluir",
                onClick: () => {
                  setShowConfirmDeleteExpense(true);
                },
              },
            ]}
            trigger={
              <Button variant={"ghost"} size={"icon"} className="h-auto p-1">
                <EllipsisVertical />
              </Button>
            }
          />
        </List.Td>
      </List.Row>

      {showTransactionModal && (
        <ExpenseModal
          isOpen
          expenseId={installment.expenseId}
          onClose={() => setShowTransactionModal(false)}
        />
      )}

      {showConfirmDeleteExpense && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteExpense}
          onOpenChange={() => setShowConfirmDeleteExpense(false)}
          description={"Deseja realmente excluir essa despesa?"}
          onConfirm={() => mutateDeleteExpense(installment.expenseId)}
          onCancel={() => setShowConfirmDeleteExpense(false)}
          confirmText="Sim quero excluir"
        />
      )}

      {showExpenseDetails && (
        <ExpenseDetailsModal
          isOpen
          expenseId={installment.expenseId}
          onClose={() => setShowExpenseDetails(false)}
        />
      )}
    </>
  );
};
