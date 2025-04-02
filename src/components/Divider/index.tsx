import { cn } from "@/lib/utils";

interface DividerProps {
  space?: string;
  className?: string;
}
export const Divider = ({ space, className }: DividerProps) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center py-${space || 6}`,
        className
      )}
    >
      <div className="w-full h-[0.5px] bg-gray-100 dark:bg-gray-700"></div>
    </div>
  );
};
