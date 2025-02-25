import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { formatToDateString } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { TransactionDetailsModal } from "@/shared/Modals/TransactionDetailsModal";
import { Expense } from "@/services/expense";
import { ExpenseModal } from "@/shared/Modals/ExpenseModal";
import { useExpenseItem } from "./useExpenseItem";

interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConfirmDeleteExpense, setShowConfirmDeleteExpense] =
    useState(false);

  const [showTransactionDetailsModal, setShowTransactionDetailsModal] =
    useState(false);

  const { mutateDeleteExpense, isLoadingDeleteExpense } = useExpenseItem({
    stateModal: setShowConfirmDeleteExpense,
  });

  return (
    <>
      <List.Row>
        <List.Td className="text-gray-900">{expense.description}</List.Td>
        <List.Td className="text-gray-900">{expense.category?.name}</List.Td>

        <List.Td className="text-gray-600">
          {formatToDateString(expense.dueDate)}
        </List.Td>

        <List.Td className="text-gray-900">
          {formatCurrency(expense.amount)}
        </List.Td>

        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Detalhes da despesa",
                onClick: () => setShowTransactionDetailsModal(true),
              },
              {
                label: "Editar",
                onClick: () => setShowTransactionModal(true),
              },
              {
                label: "Excluir",
                onClick: () => setShowConfirmDeleteExpense(true),
              },
            ]}
            trigger={
              <Button variant={"ghost"} size={"icon"} className="h-auto">
                <EllipsisVertical />
              </Button>
            }
          />
        </List.Td>
      </List.Row>

      {showTransactionModal && (
        <ExpenseModal
          isOpen
          expenseId={expense.id}
          onClose={() => setShowTransactionModal(false)}
        />
      )}

      {showConfirmDeleteExpense && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteExpense}
          onOpenChange={() => setShowConfirmDeleteExpense(false)}
          description={"Deseja realmente excluir essa despesa?"}
          onConfirm={() => mutateDeleteExpense(expense.id)}
          onCancel={() => setShowConfirmDeleteExpense(false)}
          confirmText="Sim quero excluir"
        />
      )}

      {showTransactionDetailsModal && (
        <TransactionDetailsModal
          isOpen
          transactionId={expense.id}
          onClose={() => setShowTransactionDetailsModal(false)}
        />
      )}
    </>
  );
};
