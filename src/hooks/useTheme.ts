import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return { currentTheme: theme, setTheme };
}
