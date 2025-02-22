import { formatDateLabel } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/services/transaction";
import { TransactionDetailsModal } from "@/shared/Modals/TransactionDetailsModal";
import { useState } from "react";

interface LastTransactionsItemProps {
  transaction: Transaction;
}
export const LastTransactionsItem = ({
  transaction,
}: LastTransactionsItemProps) => {
  const [showTransactionDetailsModal, setShowTransactionDetailsModal] =
    useState(false);
  return (
    <div
      onClick={() => setShowTransactionDetailsModal(true)}
      className={cn(
        "flex items-center justify-between p-3 rounded-xl cursor-pointer",
        " bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/40  dark:hover:bg-gray-900/80 transition-colors"
      )}
    >
      <div>
        <p className="font-medium">
          {transaction.description || transaction.category.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatDateLabel(transaction.date)}
        </p>
      </div>
      <p
        className={`font-medium ${
          transaction.type === "ENTRY" ? "text-green-600" : "text-red-400"
        }`}
      >
        {transaction.type !== "ENTRY" && "-"}
        {formatCurrency(transaction.amount)}
      </p>

      {showTransactionDetailsModal && (
        <TransactionDetailsModal
          isOpen={showTransactionDetailsModal}
          onClose={() => setShowTransactionDetailsModal(false)}
          transactionId={transaction.id}
        />
      )}
    </div>
  );
};
