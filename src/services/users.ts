import { Api } from "./api";

export const AuthUser = (body: AuthUserRequest) =>
  Api().post<AuthResponse>(`users/auth/`, body);

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
