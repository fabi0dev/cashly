import { List } from "@/components/List";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/services/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <>
      <List.Row>
        <List.Td className="p-4 text-gray-600">
          {new Date(transaction.date).toLocaleDateString("pt-BR")}
        </List.Td>
        <List.Td className="p-4 font-medium text-gray-900">
          {transaction.description}
        </List.Td>
        <List.Td className="p-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {transaction.category}
          </span>
        </List.Td>
        <List.Td
          className={cn(
            `p-4 text-right font-medium`,
            transaction.type === "ENTRY" ? "text-green-600" : "text-red-600"
          )}
        >
          {transaction.type === "EXIT" && "-"}
          {formatCurrency(transaction.amount)}
        </List.Td>
      </List.Row>
    </>
  );
};
