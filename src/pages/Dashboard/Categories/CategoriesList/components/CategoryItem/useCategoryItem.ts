import { toastSuccess } from "@/lib/toast";
import { Category, DeleteCategory, UpdateCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCategoryItem = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: mutationFavorite, isPending: isLoadingFavorite } =
    useMutation({
      mutationFn: async (data: Category) => {
        const { id, isFavorite } = data;

        return await UpdateCategory(id, {
          isFavorite: isFavorite === true ? false : true,
        });
      },
      onSuccess: () => {
        toastSuccess("Categoria atualizada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  const { mutateAsync: mutationDelete, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: async (categoryId: string) =>
        await DeleteCategory(categoryId),
      onSuccess: () => {
        toastSuccess("Categoria excluída com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  return {
    mutationFavorite,
    isLoadingFavorite,

    mutationDelete,
    isLoadingDelete,
  };
};
