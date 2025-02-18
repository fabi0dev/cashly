import { Api } from "./api";
import { RequestPagination } from "./common";

export const GetAllAccounts = async (params: GetAllAccountsRequest) => {
  return await Api().get<AccountResponse>(`/account`, {
    params,
  });
};

export const CreateAccount = async (data: AccountCreateRequest) =>
  await Api().post<Account>(`/account`, data);

export const UpdateAccount = async (id: string, data: AccountUpdateRequest) =>
  await Api().put<Account>(`/account/${id}`, data);

export const DeleteAccount = async (id: string) =>
  await Api().delete<void>(`/account/${id}`);

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type GetAllAccountsRequest = RequestPagination & {};

export interface AccountResponse {
  data: Account[];
  totalItems: number;
  totalPages: number;
}

export interface AccountCreateRequest {
  name: string;
  type: string;
  balance: number;
}

export interface AccountUpdateRequest {
  name?: string;
  type?: string;
  balance?: number;
}
