import { useForm } from "react-hook-form";
import { schemaTransactionModal, SchemaTransactionModal } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

export const useTransactionModal = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaTransactionModal>({
    resolver: yupResolver(schemaTransactionModal),
    defaultValues: {
      type: "income",
    },
  });

  const submit = () => {};

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    submit: handleSubmit(submit),
  };
};
