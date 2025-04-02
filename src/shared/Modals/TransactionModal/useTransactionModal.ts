import { useForm } from "react-hook-form";
import { schemaTransactionModal, SchemaTransactionModal } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTransaction, UpdateTransaction } from "@/services/transaction";
import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { useEffect } from "react";

interface UseTransactionModalProps {
  transactionId?: string;
  onClose: () => void;
}
export const useTransactionModal = ({
  transactionId,
  onClose,
}: UseTransactionModalProps) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<SchemaTransactionModal>({
    resolver: yupResolver(schemaTransactionModal),
    defaultValues: {
      type: "EXIT",
    },
  });

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({
      queryKey: queries.transaction.getAll().queryKey,
    });

    queryClient.invalidateQueries({
      queryKey: queries.financeOverview.getSummary().queryKey,
    });
  };

  const { data: listAccounts, isFetching: isLoadingListAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const { data: categoriesData, isFetching: isLoadingCategoriesData } =
    useQuery({
      ...queries.categories.getAll(),
    });

  const { data: dataTransaction, isFetching: isLoadingTransaction } = useQuery({
    ...queries.transaction.getById({ transactionId: transactionId! }),
    enabled: !!transactionId,
  });

  const {
    mutateAsync: mutateCreateTransaction,
    isPending: isPendingCreateTransaction,
  } = useMutation({
    mutationFn: (data: SchemaTransactionModal) => CreateTransaction(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Transação criada com sucesso");
      invalidateTransactions();
    },
    onError: () => toastError("Erro ao criar transação"),
  });

  const {
    mutateAsync: mutateUpdateTransaction,
    isPending: isPendingUpdateTransaction,
  } = useMutation({
    mutationFn: (data: SchemaTransactionModal) =>
      UpdateTransaction(transactionId!, data),
    onSuccess: () => {
      onClose();
      toastSuccess("Transação atualizada com sucesso");
      invalidateTransactions();
    },
    onError: () => toastError("Erro ao atualizar transação"),
  });

  const submit = (formData: SchemaTransactionModal) => {
    if (transactionId) {
      mutateUpdateTransaction(formData);
    } else {
      mutateCreateTransaction(formData);
    }
  };

  useEffect(() => {
    if (listAccounts) {
      const accountDefault =
        listAccounts.data?.find((item) => item.isDefault) || undefined;

      if (accountDefault) setValue("accountId", accountDefault.id);
    }
  }, [listAccounts]);

  useEffect(() => {
    if (dataTransaction) {
      reset({
        accountId: dataTransaction.accountId,
        amount: dataTransaction.amount,
        categoryId: dataTransaction.categoryId,
        date: dataTransaction.date,
        description: dataTransaction.description,
        type: dataTransaction.type,
      });
    }
  }, [dataTransaction]);

  return {
    setValue,
    watch,
    errors,
    control,
    submit: handleSubmit(submit),

    listAccounts,
    categoriesData,

    isLoadingMutates: isPendingCreateTransaction || isPendingUpdateTransaction,
    isPreLoadings:
      isLoadingListAccounts || isLoadingTransaction || isLoadingCategoriesData,
  };
};
