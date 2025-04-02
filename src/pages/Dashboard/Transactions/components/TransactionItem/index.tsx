import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { formatToDateString } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/services/transaction";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useTransactionItem } from "./useTransactionItem";
import { TransactionDetailsModal } from "@/shared/Modals/TransactionDetailsModal";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConfirmDeleteTransaction, setShowConfirmDeleteTransaction] =
    useState(false);
  const [showTransactionDetailsModal, setShowTransactionDetailsModal] =
    useState(false);

  const { mutateDeleteTransaction, isLoadingDeleteTransaction } =
    useTransactionItem({
      stateModal: setShowConfirmDeleteTransaction,
    });

  return (
    <>
      <List.Row>
        <List.Td className="p-4 text-gray-600">
          {formatToDateString(transaction.date)}
        </List.Td>
        <List.Td className="p-4 text-gray-900">
          {transaction.account.name}
        </List.Td>
        <List.Td className="p-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-300 text-gray-800">
            {transaction.category?.name}
          </span>
        </List.Td>
        <List.Td
          className={cn(
            `p-4 text-right font-medium`,
            transaction.type === "ENTRY"
              ? "text-green-600 dark:text-green-600"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {transaction.type === "EXIT" && "-"}
          {formatCurrency(transaction.amount)}
        </List.Td>
        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Detalhes da transação",
                onClick: () => setShowTransactionDetailsModal(true),
              },
              {
                label: "Editar transação",
                onClick: () => setShowTransactionModal(true),
              },
              {
                label: "Excluir",
                onClick: () => setShowConfirmDeleteTransaction(true),
              },
            ]}
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            }
          />
        </List.Td>
      </List.Row>

      {showTransactionModal && (
        <TransactionModal
          isOpen
          transactionId={transaction.id}
          onClose={() => setShowTransactionModal(false)}
        />
      )}

      {showConfirmDeleteTransaction && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteTransaction}
          onOpenChange={() => setShowConfirmDeleteTransaction(false)}
          description={"Deseja realmente excluir essa transação?"}
          onConfirm={() => mutateDeleteTransaction(transaction.id)}
          onCancel={() => setShowConfirmDeleteTransaction(false)}
          confirmText="Sim quero excluir"
        />
      )}

      {showTransactionDetailsModal && (
        <TransactionDetailsModal
          isOpen
          transactionId={transaction.id}
          onClose={() => setShowTransactionDetailsModal(false)}
        />
      )}
    </>
  );
};
