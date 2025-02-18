import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/toast";
import { schemaAccountModal, SchemaAccountModal } from "./schema";
import { CreateAccount, UpdateAccount } from "@/services/account";
import { queries } from "@/queries";
import { useEffect } from "react";

interface UseAccountModalProps {
  accountId?: string;
  onClose: () => void;
}

export const useAccountModal = ({
  accountId,
  onClose,
}: UseAccountModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SchemaAccountModal>({
    resolver: yupResolver(schemaAccountModal),
    defaultValues: schemaAccountModal.getDefault(),
  });

  const invalidateAccountList = () => {
    queryClient.invalidateQueries({ queryKey: queries.account.getAll._def });
  };

  const {
    mutateAsync: mutateCreateAccount,
    isPending: isPendingCreateAccount,
  } = useMutation({
    mutationFn: (data: SchemaAccountModal) => CreateAccount(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Conta criada com sucesso!");
      invalidateAccountList();
    },
    onError: () => toastError("Erro ao criar conta!"),
  });

  const {
    mutateAsync: mutateUpdateAccount,
    isPending: isLoadingUpdateAccount,
  } = useMutation({
    mutationFn: (data: SchemaAccountModal) => UpdateAccount(accountId!, data),
    onSuccess: () => {
      onClose();
      toastSuccess("Conta atualizada com sucesso!");
      invalidateAccountList();
    },
    onError: () => toastError("Erro ao atualizar conta!"),
  });

  const { data: dataAccount, isFetching: isLoadingDataAccount } = useQuery({
    ...queries.account.getById({ accountId: accountId! }),
    enabled: !!accountId,
  });

  const submit = (formData: SchemaAccountModal) => {
    if (accountId) {
      mutateUpdateAccount(formData);
    } else {
      mutateCreateAccount(formData);
    }
  };

  useEffect(() => {
    reset({
      balance: dataAccount?.balance,
      name: dataAccount?.name,
      type: dataAccount?.type,
      isDefault: dataAccount?.isDefault,
    });
  }, [reset, dataAccount]);

  return {
    register,
    setValue,
    watch,
    errors,

    dataAccount,
    isLoadingDataAccount,

    mutateUpdateAccount,
    isLoadingUpdateAccount,

    submit: handleSubmit(submit),
    isLoading: isPendingCreateAccount,
  };
};
