import { toastError, toastSuccess } from "@/lib/toast";
import { MarkPaid } from "@/services/expense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SchemaPayExpenseModal, schemaPayExpenseModal } from "./schema";
import { useEffect } from "react";
import { queries } from "@/queries";
import { yupResolver } from "@hookform/resolvers/yup";

interface UsePayExpenseModalProps {
  expenseId: string;
  onClose: () => void;
}

export const usePayExpenseModal = ({
  expenseId,
  onClose,
}: UsePayExpenseModalProps) => {
  const formMethods = useForm<SchemaPayExpenseModal>({
    resolver: yupResolver(schemaPayExpenseModal),
    defaultValues: schemaPayExpenseModal.getDefault(),
  });

  const queryClient = useQueryClient();

  const { handleSubmit, setValue } = formMethods;

  const invalidateExpenseDetail = () =>
    queryClient.invalidateQueries({
      queryKey: queries.expense.getById({ expenseId }).queryKey,
    });

  const { data: listAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const { mutateAsync: markAsPaid, isPending: isLoading } = useMutation({
    mutationFn: (body: SchemaPayExpenseModal) => {
      const { expenseId, ...data } = body;

      return MarkPaid(expenseId, {
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
  });

  const submit = async (data: SchemaPayExpenseModal) => {
    await markAsPaid(data);
  };

  useEffect(() => {
    if (listAccounts) {
      const accountDefault =
        listAccounts.data?.find((item) => item.isDefault) || undefined;

      if (accountDefault) setValue("accountId", accountDefault.id);
    }
  }, [listAccounts, setValue]);

  useEffect(() => {
    if (expenseId) setValue("expenseId", expenseId);
  }, [expenseId, setValue]);

  return {
    formMethods,

    markAsPaid: handleSubmit(submit),
    isLoading,

    listAccounts,
  };
};
