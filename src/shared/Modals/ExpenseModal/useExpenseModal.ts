import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { CreateExpense, UpdateExpense } from "@/services/expense";
import { expenseSchema, SchemaExpenseModal } from "./schema";
import { ExpenseMapper } from "./expense.mapper";

interface UseExpenseModalProps {
  expenseId?: string;
  onClose: () => void;
}

export const useExpenseModal = ({
  expenseId,
  onClose,
}: UseExpenseModalProps) => {
  const queryClient = useQueryClient();

  const { data: categoriesData, isFetching: isLoadingCategoriesData } =
    useQuery({
      ...queries.categories.getAll(),
    });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SchemaExpenseModal>({
    resolver: yupResolver(expenseSchema),
    defaultValues: expenseSchema.getDefault(),
  });

  const invalidateExpenseList = () => {
    queryClient.invalidateQueries({ queryKey: queries.expense.getAll._def });
    queryClient.invalidateQueries({
      queryKey: queries.expenseInstallments.getAll._def,
    });
  };

  const {
    mutateAsync: mutateCreateExpense,
    isPending: isPendingCreateExpense,
  } = useMutation({
    mutationFn: async (data: SchemaExpenseModal) => {
      return await CreateExpense(ExpenseMapper.toInsert(data));
    },
    onSuccess: () => {
      onClose();
      toastSuccess("Despesa criada com sucesso!");
      invalidateExpenseList();
    },
    onError: () => toastError("Erro ao criar despesa!"),
  });

  const {
    mutateAsync: mutateUpdateExpense,
    isPending: isLoadingUpdateExpense,
  } = useMutation({
    mutationFn: (data: SchemaExpenseModal) => UpdateExpense(expenseId!, data),
    onSuccess: () => {
      onClose();
      toastSuccess("Despesa atualizada com sucesso!");
      invalidateExpenseList();
    },
    onError: () => toastError("Erro ao atualizar despesa!"),
  });

  const { data: dataExpense, isFetching: isLoadingDataExpense } = useQuery({
    ...queries.expense.getById({ expenseId: expenseId! }),
    enabled: !!expenseId,
  });

  const submit = (formData: SchemaExpenseModal) => {
    if (expenseId) {
      mutateUpdateExpense(formData);
    } else {
      mutateCreateExpense(formData);
    }
  };

  /*  useEffect(() => {
    reset({
      amount: dataExpense?.amount,
      description: dataExpense?.description,
      ///     categoryId: dataExpense?.categoryId,
      isPaid: dataExpense?.isPaid,
    });
  }, [reset, dataExpense]); */

  return {
    register,
    setValue,
    watch,
    errors,

    dataExpense,
    isLoadingDataExpense,

    mutateUpdateExpense,
    isLoadingUpdateExpense,

    submit: handleSubmit(submit),
    isLoading: isPendingCreateExpense,
    isLoadingManager: isLoadingCategoriesData,

    categoriesData,
    control,
  };
};
