import { Dialog } from "@/components/Dialog";
import { Divider } from "@/components/Divider";
import { formatToDateString } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Tag, TrendingDown, TrendingUp } from "lucide-react";

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
  const { data: dataTransaction, isFetching: isLoadingTransaction } = useQuery({
    ...queries.transaction.getById({ transactionId: transactionId! }),
    enabled: !!transactionId,
  });

  return (
    <Dialog
      title={"Detalhes da Transação"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingTransaction}
    >
      <div className="mb-6 space-y-5">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
            dataTransaction?.type === "ENTRY"
              ? "bg-green-50 text-green-600 dark:bg-green-400/10"
              : "bg-red-50 text-red-600 dark:text-red-400 dark:bg-red-300/10"
          }`}
        >
          {dataTransaction?.type === "ENTRY" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium capitalize">
            {dataTransaction?.type === "ENTRY" ? "Receita" : "Despesa"}
          </span>
        </div>

        <div className="mb-8">
          <p
            className={`text-3xl font-bold ${
              dataTransaction?.type === "ENTRY"
                ? "text-green-600 "
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {formatCurrency(dataTransaction?.amount || 0)}
          </p>
        </div>

        <div className="space-y-1">
          {dataTransaction?.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Descrição
              </h3>
              <p>{dataTransaction?.description}</p>
            </div>
          )}

          {dataTransaction?.category && (
            <>
              <Divider />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Categoria
                </h3>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span>{dataTransaction?.category.name}</span>
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
                  {formatToDateString(dataTransaction?.date || "")}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Saldo anterior
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="capitalize">
                  {formatCurrency(dataTransaction?.accountBalance || 0)}
                </span>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Identificador
            </h3>
            <p className="text-sm font-mono text-gray-400">
              #{dataTransaction?.id}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
