import { useForm } from "react-hook-form";
import { schemaTransactionModal, SchemaTransactionModal } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateTransaction } from "@/services/transaction";
import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { useEffect } from "react";

interface UseTransactionModalProps {
  onClose: () => void;
}
export const useTransactionModal = ({ onClose }: UseTransactionModalProps) => {
  //const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaTransactionModal>({
    resolver: yupResolver(schemaTransactionModal),
    defaultValues: {
      type: "EXIT",
    },
  });

  const { data: listAccounts, isFetching: isLoadingListAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const {
    mutateAsync: mutateCreateTransaction,
    isPending: isPendingCreateTransaction,
  } = useMutation({
    mutationFn: (data: SchemaTransactionModal) => CreateTransaction(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Transação criada com sucesso");
    },
    onError: () => toastError("Erro ao criar transação"),
  });

  const submit = (formData: SchemaTransactionModal) => {
    mutateCreateTransaction(formData);
  };

  useEffect(() => {
    if (listAccounts) {
      const accountDefault =
        listAccounts.data?.find((item) => item.isDefault) || undefined;

      if (accountDefault) setValue("accountId", accountDefault.id);
    }
  }, [listAccounts]);
  console.log("veio");

  return {
    register,
    setValue,
    watch,
    errors,
    submit: handleSubmit(submit),
    isLoading: isPendingCreateTransaction,

    listAccounts,
    isLoadingListAccounts,
  };
};
