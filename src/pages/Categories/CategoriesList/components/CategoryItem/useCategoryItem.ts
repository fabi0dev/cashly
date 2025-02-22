import { toastSuccess } from "@/lib/toast";
import { Category, UpdateCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCategoryItem = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: mutationFavorite } = useMutation({
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

  return {
    mutationFavorite,
  };
};
