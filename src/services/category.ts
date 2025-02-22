import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllCategories = () => Api().get<Category[]>("/category");

export const GetCategoryById = (categoryId: string) =>
  Api().get<Category>(`/category/${categoryId}`);

export const CreateCategory = (data: CategoryCreateRequest) =>
  Api().post<Category>(`/category`, data);

export const UpdateCategory = (
  categoryId: string,
  data: CategoryUpdateRequest
) => Api().put<Category>(`/category/${categoryId}`, data);

export const DeleteCategory = (categoryId: string) =>
  Api().delete<Category>(`/category/${categoryId}`);

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
  importanceLevel: number;
  isFavorite: boolean;
  userId: string;
};

export type CategoryType = "INCOME" | "EXPENSE";

export type GetAllCategoriesRequest = RequestPagination & {};

export interface CategoryCreateRequest {
  name: string;
  importanceLevel: number;
  isFavorite: boolean;
}

export type CategoryUpdateRequest = CategoryCreateRequest;
