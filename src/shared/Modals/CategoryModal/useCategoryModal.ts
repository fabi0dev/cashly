import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { useEffect } from "react";
import { schemaCategoryModal, SchemaCategoryModal } from "./schema";
import { CreateCategory, UpdateCategory } from "@/services/category";

interface UseCategoryModal {
  categoryId?: string;
  onClose: () => void;
}

export const useCategoryModal = ({ categoryId, onClose }: UseCategoryModal) => {
  const queryClient = useQueryClient();

  const formMethods = useForm<SchemaCategoryModal>({
    resolver: yupResolver(schemaCategoryModal),
    defaultValues: schemaCategoryModal.getDefault(),
  });

  const { handleSubmit, reset } = formMethods;

  const invalidateCategoriesList = () => {
    queryClient.invalidateQueries({ queryKey: queries.categories.getAll._def });
  };

  const {
    mutateAsync: mutateCreateCategory,
    isPending: isPendingCreateCategory,
  } = useMutation({
    mutationFn: (data: SchemaCategoryModal) => CreateCategory(data),
    onSuccess: () => {
      onClose();
      toastSuccess("Categoria criada com sucesso!");
      invalidateCategoriesList();
    },
    onError: () => toastError("Erro ao criar categoria!"),
  });

  const {
    mutateAsync: mutateUpdateCategory,
    isPending: isLoadingUpdateCategory,
  } = useMutation({
    mutationFn: (data: SchemaCategoryModal) =>
      UpdateCategory(categoryId!, data),
    onSuccess: () => {
      onClose();
      toastSuccess("Categoria atualizada com sucesso!");
      invalidateCategoriesList();
    },
    onError: () => toastError("Erro ao atualizar categoria!"),
  });

  const { data: dataCategory, isLoading: isLoadingDataCategory } = useQuery({
    ...queries.categories.getById({ categoryId: categoryId! }),
    enabled: !!categoryId,
  });

  const submit = (formData: SchemaCategoryModal) => {
    if (categoryId) {
      mutateUpdateCategory(formData);
    } else {
      mutateCreateCategory(formData);
    }
  };

  useEffect(() => {
    if (dataCategory) {
      reset({
        importanceLevel: dataCategory?.importanceLevel,
        name: dataCategory?.name,
        type: dataCategory?.type,
        isFavorite: dataCategory?.isFavorite,
      });
    }
  }, [reset, dataCategory]);

  return {
    formMethods,

    dataCategory,
    isLoadingDataCategory,

    mutateUpdateCategory,

    submit: handleSubmit(submit),
    isLoadingManager: isPendingCreateCategory || isLoadingUpdateCategory,
  };
};
