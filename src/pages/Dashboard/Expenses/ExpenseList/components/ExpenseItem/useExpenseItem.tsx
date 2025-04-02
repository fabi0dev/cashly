import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { DeleteExpense } from "@/services/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseExpenseItemProps {
  stateModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useExpenseItem = ({ stateModal }: UseExpenseItemProps) => {
  const queryClient = useQueryClient();

  const invalidateExpenseInstallments = () => {
    queryClient.invalidateQueries({
      queryKey: queries.expenseInstallments.getAll._def,
    });
  };

  const {
    mutateAsync: mutateDeleteExpense,
    isPending: isLoadingDeleteExpense,
  } = useMutation({
    mutationFn: async (expenseId: string) => await DeleteExpense(expenseId),
    onSuccess: () => {
      stateModal(false);
      invalidateExpenseInstallments();
      toastSuccess("Despesa excluída com sucesso");
    },
    onError: () => {
      toastError("Erro ao excluir despesa");
    },
  });

  return {
    mutateDeleteExpense,
    isLoadingDeleteExpense,
  };
};
