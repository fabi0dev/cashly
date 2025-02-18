import { Api } from "./api";

export const GetAllAccounts = () => Api().get<AccountResponse>(`/account`);

export const CreateAccount = (data: AccountCreateRequest) =>
  Api().post<AccountResponse>(`/account`, data);

export const UpdateAccount = (id: string, data: AccountUpdateRequest) =>
  Api().put<AccountResponse>(`/account/${id}`, data);

export const DeleteAccount = (id: string) =>
  Api().delete<AccountResponse>(`/account/${id}`);

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
