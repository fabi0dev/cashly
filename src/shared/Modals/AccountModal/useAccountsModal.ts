import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/toast";
import { schemaAccountModal, SchemaAccountModal } from "./schema";
import { CreateAccount } from "@/services/account";
import { queries } from "@/queries";

interface UseAccountModalProps {
  onClose: () => void;
}

export const useAccountModal = ({ onClose }: UseAccountModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaAccountModal>({
    resolver: yupResolver(schemaAccountModal),
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

  const submit = (formData: SchemaAccountModal) => {
    mutateCreateAccount(formData);
  };

  return {
    register,
    setValue,
    watch,
    errors,
    submit: handleSubmit(submit),
    isLoading: isPendingCreateAccount,
  };
};
