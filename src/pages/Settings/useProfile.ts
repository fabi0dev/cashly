import { UpdateUserProfile } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { schemaProfile, SchemaProfile } from "./schemaProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { toastSuccess } from "@/lib/toast";

export const useProfile = () => {
  const user = useAuthStore((state) => state.authData?.user)!;
  const setUserData = useAuthStore((state) => state.setUserData);

  const formMethods = useForm<SchemaProfile>({
    resolver: yupResolver(schemaProfile),
  });

  const { handleSubmit, control, setValue } = formMethods;

  const { mutateAsync: updateProfile, isPending: isLoadingUpdateProfile } =
    useMutation({
      mutationFn: async (data: SchemaProfile) => {
        const { data: dataUserUpdated } = await UpdateUserProfile(data);
        return dataUserUpdated;
      },
      onSuccess: (response) => {
        toastSuccess("Perfil atualizado com sucesso!");
        setUserData(response);
      },
    });

  const submit = (data: SchemaProfile) => {
    updateProfile(data);
  };

  useEffect(() => {
    setValue("name", user?.name);
  }, [setValue, user]);

  return {
    control,
    isLoadingUpdateProfile,
    submit: handleSubmit(submit),
  };
};
