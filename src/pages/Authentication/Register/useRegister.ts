import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaRegister, SchemaRegister } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "@/services/users";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toastError } from "@/lib/toast";
import { ApiErrorResponse } from "@/services/api";
import { sanitizeToRequest } from "./sanitize";

export function useRegister() {
  const navigate = useNavigate();
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const { handleSubmit, control } = useForm<SchemaRegister>({
    resolver: yupResolver(schemaRegister),
  });

  const { mutateAsync: register, isPending: isLoadingRegister } = useMutation({
    mutationFn: async (data: SchemaRegister) => {
      const response = await CreateUser(sanitizeToRequest(data));
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
      if (error.statusCode === 409) {
        toastError("E-mail já cadastrado");
      }
    },
  });

  const submit = async (data: SchemaRegister) => register(data);

  return {
    control,
    isLoadingRegister,
    submit: handleSubmit(submit),
  };
}
