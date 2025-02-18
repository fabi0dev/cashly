import { useForm } from "react-hook-form";
import { schemaTransactionModal, SchemaTransactionModal } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { CreateTransaction } from "@/services/transaction";
import { toastSuccess } from "@/lib/toast";

interface UseTransactionModalProps {
  onClose: () => void;
}
export const useTransactionModal = ({ onClose }: UseTransactionModalProps) => {
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

  const {
    mutateAsync: mutateCreateTransaction,
    isPending: isPendingCreateTransaction,
  } = useMutation({
    mutationFn: (data: SchemaTransactionModal) => CreateTransaction(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Transação criada com sucesso!");
    },
    onError: () => toastSuccess("Erro ao criar com sucesso!"),
  });

  const submit = (formData: SchemaTransactionModal) => {
    mutateCreateTransaction(formData);
  };

  return {
    register,
    setValue,
    watch,
    errors,
    submit: handleSubmit(submit),
    isLoading: isPendingCreateTransaction,
  };
};
