import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthData {
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
  setAuthData: (authData: AuthData) => void;
  setUserData: (user: Partial<AuthData["user"]>) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      authData: null,
      isAuthenticated: false,
      setAuthData: (authData) => set({ authData, isAuthenticated: true }),
      setUserData: (user) =>
        set((state) => ({
          authData: state.authData
            ? { ...state.authData, user: { ...state.authData.user, ...user } }
            : null,
        })),
      logout: () => set({ authData: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
