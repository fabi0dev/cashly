import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { currentTheme } = useTheme();
  return (
    <img
      src={currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
      className={cn(className)}
    />
  );
};
