import { GetAllCategories, GetCategoryById } from "@/services/category";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type GetCategoryById = { categoryId: string };

export const categories = createQueryKeys("categories", {
  getAll: () => ({
    queryKey: [undefined],
    queryFn: async () => {
      const { data } = await GetAllCategories();

      return data;
    },
  }),
  getById: ({ categoryId }: GetCategoryById) => ({
    queryKey: [categoryId],
    queryFn: async () => {
      const { data } = await GetCategoryById(categoryId);
      return data;
    },
  }),
});
