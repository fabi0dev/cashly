import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/toast";
import { CreateAccount } from "@/services/accounts";
import { schemaAccountModal, SchemaAccountModal } from "./schema";

interface UseAccountModalProps {
  onClose: () => void;
}

export const useAccountModal = ({ onClose }: UseAccountModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaAccountModal>({
    resolver: yupResolver(schemaAccountModal),
  });

  const {
    mutateAsync: mutateCreateAccount,
    isPending: isPendingCreateAccount,
  } = useMutation({
    mutationFn: (data: SchemaAccountModal) => CreateAccount(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Conta criada com sucesso!");
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
