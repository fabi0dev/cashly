import { toastError, toastSuccess } from "@/lib/toast";
import { MarkInstallmentPaid } from "@/services/expense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { queries } from "@/queries";
import { schemaPayInstallmentModal, SchemaPayInstallmentModal } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface UsePayInstallmentModalProps {
  expenseId: string;
  installmentId: string;
  onClose: () => void;
}

export const usePayInstallmentModal = ({
  expenseId,
  installmentId,
  onClose,
}: UsePayInstallmentModalProps) => {
  const formMethods = useForm<SchemaPayInstallmentModal>({
    resolver: yupResolver(schemaPayInstallmentModal),
    defaultValues: schemaPayInstallmentModal.getDefault(),
  });

  const queryClient = useQueryClient();

  const { handleSubmit, setValue } = formMethods;

  const invalidateExpenseDetail = () =>
    queryClient.invalidateQueries({
      queryKey: queries.expense.getById({ expenseId }).queryKey,
    });

  const { data: listAccounts, isFetching: isLoadingListAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const { data: dataExpense, isFetching: isLoadingDataExpense } = useQuery({
    ...queries.expense.getById({ expenseId }),
  });

  const { mutateAsync: markAsPaid, isPending: isLoadingMarkPaid } = useMutation(
    {
      mutationFn: (body: SchemaPayInstallmentModal) => {
        const { ...data } = body;

        return MarkInstallmentPaid(installmentId, {
          ...data,
        });
      },
      onSuccess: () => {
        toastSuccess("Despesa marcada como paga com sucesso!");
        invalidateExpenseDetail();
        onClose();
      },
      onError: () => {
        toastError("Não foi possível marcar despesa como paga");
      },
    }
  );

  const submit = async (data: SchemaPayInstallmentModal) => {
    await markAsPaid(data);
  };

  useEffect(() => {
    if (listAccounts?.data) {
      const accountDefault = listAccounts.data?.find((item) => item.isDefault);

      if (accountDefault) {
        setValue("accountId", accountDefault.id);
      }
    }
  }, [listAccounts, setValue]);

  return {
    formMethods,

    markAsPaid: handleSubmit(submit),
    isLoading: isLoadingMarkPaid,

    dataExpense,
    loadingManager: isLoadingListAccounts || isLoadingDataExpense,

    listAccounts,
  };
};
