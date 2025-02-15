import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

interface AuthState {
  authData: AuthData | null;
  isAuthenticated: boolean;
  setAuthData: (user: AuthData) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      authData: null,
      isAuthenticated: false,
      setAuthData: (authData) => set({ authData, isAuthenticated: true }),
      logout: () => set({ authData: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
