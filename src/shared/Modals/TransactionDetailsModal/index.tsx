import { Dialog } from "@/components/Dialog";
import { Divider } from "@/components/Divider";
import { formatToDateString } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  ExternalLink,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

interface TransactionModalProps {
  transactionId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailsModal({
  transactionId,
  isOpen,
  onClose,
}: TransactionModalProps) {
  const { data: dataTransaction, isLoading: isLoadingTransaction } = useQuery({
    ...queries.transaction.getById({ transactionId: transactionId! }),
    enabled: Boolean(transactionId),
  });

  const details = [
    { label: "Descrição", value: dataTransaction?.description },
    {
      label: "Categoria",
      value: dataTransaction?.category?.name,
      icon: <Tag className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Data",
      value: dataTransaction?.date && formatToDateString(dataTransaction.date),
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Saldo anterior",
      value: formatCurrency(dataTransaction?.accountBalance || 0),
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Identificador",
      value: `#${dataTransaction?.id}`,
      className: "text-sm font-mono text-gray-400",
    },
  ];

  return (
    <Dialog
      title={
        <div>
          Detalhes da Transação{" "}
          {dataTransaction?.expenseId && (
            <Link
              to={`/expenses/details/${dataTransaction?.expenseId}`}
              target="_blank"
              className="ml-2"
              title="Ver detalhes da despesa"
            >
              <div
                className={cn(
                  `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs`,
                  "bg-gray-100 text-purple-400 dark:text-white dark:bg-white/10"
                )}
              >
                <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      }
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingTransaction}
    >
      <div className="flex flex-row gap-4">
        {dataTransaction?.type && (
          <div
            className={`inline-flex items-center gap-2 px-3 rounded-full mb-4 ${
              dataTransaction.type === "ENTRY"
                ? "bg-green-50 text-green-600 dark:bg-green-400/10"
                : "bg-red-50 text-red-600 dark:text-red-400 dark:bg-red-300/10"
            }`}
          >
            {dataTransaction.type === "ENTRY" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium capitalize">
              {dataTransaction.type === "ENTRY" ? "Entrada" : "Despesa"}
            </span>
          </div>
        )}
      </div>

      <div>
        <p
          className={`text-3xl font-bold ${
            dataTransaction?.type === "ENTRY"
              ? "text-green-600"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {formatCurrency(dataTransaction?.amount || 0)}
        </p>
      </div>

      <div className="space-y-1 mt-4">
        {details.map(({ label, value, icon, className }, index) =>
          value ? (
            <div key={label}>
              {index !== 0 && <Divider space="3" />}
              <div className="text-sm font-medium text-gray-500 mb-1">
                {label}
              </div>
              <div className="flex items-center gap-2">
                {icon}
                <span className={className}>{value}</span>
              </div>
            </div>
          ) : null
        )}
      </div>
    </Dialog>
  );
}
