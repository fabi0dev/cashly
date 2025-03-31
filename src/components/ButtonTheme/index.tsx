import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export const ButtonTheme = () => {
  const { currentTheme, toogleTheme } = useTheme();

  return (
    <Button
      size={"icon"}
      className={cn(
        "fixed bottom-4 right-4",
        "bg-transparent text-primary hover:bg-gray-200",
        "dark:bg-white/5 dark:hover:bg-white/10"
      )}
      title={
        currentTheme === "dark"
          ? "Mudar para modo claro"
          : "Mudar para modo escuro"
      }
      onClick={toogleTheme}
    >
      {currentTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
