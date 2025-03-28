import { Api } from "./api";

export const AuthUser = (body: AuthUserRequest) =>
  Api().post<AuthResponse>(`users/auth/`, body);

export const CreateUser = (body: CreateUserRequest) =>
  Api().post<AuthResponse>(`users/register`, body);

export const UpdateUserProfile = (body: Partial<CreateUserRequest>) =>
  Api().patch<UpdateUserResponse>(`users/profile`, body);

interface AuthUserRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserResponse {
  id: string;
  name: string;
  email: string;
}
