import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeData {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create(
  persist<ThemeData>(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    { name: "theme-storage" }
  )
);
