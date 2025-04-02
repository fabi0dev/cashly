import { useForm } from "react-hook-form";
import { SchemaLogin, schemaLogin } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AuthUser } from "@/services/users";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toastError } from "@/lib/toast";
import { ApiErrorResponse } from "@/services/api";

export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const navigate = useNavigate();

  const formMethods = useForm<SchemaLogin>({
    resolver: yupResolver(schemaLogin),
  });

  const { handleSubmit } = formMethods;

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: async (data: SchemaLogin) => {
      const response = await AuthUser(data);
      return response.data;
    },
    onSuccess(response) {
      setAuthData({
        user: response.user,
        token: response.token,
      });

      navigate("/dashboard");
    },
    onError: (error: ApiErrorResponse) => {
      if (error.statusCode === 401) {
        toastError("E-mail ou senha inválidos");
      }
    },
  });

  const submit = async (data: SchemaLogin) => login(data);

  return {
    submit: handleSubmit(submit),
    formMethods,
    isLoading,
  };
};
