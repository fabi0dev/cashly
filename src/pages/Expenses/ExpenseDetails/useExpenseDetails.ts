import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface UseExpenseDetailsParams {
  expenseId?: string;
}

export const useExpenseDetails = () => {
  const { expenseId } = useParams<Partial<UseExpenseDetailsParams>>();

  const { data: dataExpense, isFetching: isLoadingExpense } = useQuery({
    ...queries.expense.getById({ expenseId: expenseId! }),
    enabled: !!expenseId,
  });

  return {
    dataExpense,
    isLoadingExpense,
  };
};
