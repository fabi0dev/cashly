import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { formatToDateString } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/services/transaction";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {transaction.category}
          </span>
        </List.Td>
        <List.Td
          className={cn(
            `p-4 text-right font-medium`,
            transaction.type === "ENTRY"
              ? "text-green-600 dark:text-green-600"
              : "text-red-600 dark:text-red-600"
          )}
        >
          {transaction.type === "EXIT" && "-"}
          {formatCurrency(transaction.amount)}
        </List.Td>
        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Editar transação",
                onClick: () => setShowTransactionModal(true),
              },
              {
                label: "Excluir",
                onClick: () => setShowTransactionModal(true),
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
    </>
  );
};
