import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { DeleteTransaction } from "@/services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseTransactionItemProps {
  stateModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useTransactionItem = ({ stateModal }: UseTransactionItemProps) => {
  const queryClient = useQueryClient();

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({
      queryKey: queries.transaction.getAll._def,
    });
  };

  const {
    mutateAsync: mutateDeleteTransaction,
    isPending: isLoadingDeleteTransaction,
  } = useMutation({
    mutationFn: async (transactionId: string) => {
      await DeleteTransaction(transactionId);
    },
    onSuccess: () => {
      stateModal(false);
      invalidateTransactions();
      toastSuccess("Transação excluída com sucesso");
    },
    onError: () => {
      toastError("Erro ao excluir transação");
    },
  });

  return {
    mutateDeleteTransaction,
    isLoadingDeleteTransaction,
  };
};
