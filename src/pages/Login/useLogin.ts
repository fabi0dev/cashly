import { useForm } from "react-hook-form";
import { SchemaLogin, schemaLogin } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AuthUser } from "@/services/users";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const navigate = useNavigate();

  //REMOVE
  const defaultValues = {
    email: "john.doe@example.com",
    password: "123456",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    resolver: yupResolver(schemaLogin),
    defaultValues,
  });

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
  });

  const submit = async (data: SchemaLogin) => login(data);

  return {
    submit: handleSubmit(submit),
    register,
    errors,
    isLoading,
  };
};
