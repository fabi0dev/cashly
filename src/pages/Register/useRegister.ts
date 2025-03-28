import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerFormSchema } from "./schema";

export function useRegister() {
  const { handleSubmit, control } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  return {
    control,
    submit: handleSubmit(() => {}),
  };
}
