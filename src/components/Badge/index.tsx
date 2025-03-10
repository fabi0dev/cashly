import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}
export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "p-1 px-3 rounded-full text-xs font-medium",
        "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
};
