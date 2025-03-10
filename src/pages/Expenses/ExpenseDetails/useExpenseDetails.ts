import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { DeleteExpense } from "@/services/expense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface UseExpenseDetailsParams {
  expenseId?: string;
}

export const useExpenseDetails = () => {
  const { expenseId } = useParams<Partial<UseExpenseDetailsParams>>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const invalidateExpenseInstallments = () => {
    queryClient.invalidateQueries({
      queryKey: queries.expenseInstallments.getAll._def,
    });
  };

  const { data: dataExpense, isFetching: isLoadingExpense } = useQuery({
    ...queries.expense.getById({ expenseId: expenseId! }),
    enabled: !!expenseId,
  });

  const {
    mutateAsync: mutateDeleteExpense,
    isPending: isLoadingDeleteExpense,
  } = useMutation({
    mutationFn: async (expenseId: string) => await DeleteExpense(expenseId),
    onSuccess: () => {
      invalidateExpenseInstallments();
      toastSuccess("Despesa excluída com sucesso");
      navigate("/expenses");
    },
    onError: () => {
      toastError("Erro ao excluir despesa");
    },
  });

  return {
    dataExpense,
    isLoadingExpense,

    mutateDeleteExpense,
    isLoadingDeleteExpense,
  };
};
