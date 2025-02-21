import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  titleClass?: string;
  subtitle?: string;
  icon?: ReactNode;
  iconClassName?: string;

  children?: ReactNode;
}
export const Card = ({
  title,
  titleClass,
  subtitle,
  icon,
  iconClassName,
  children,
}: CardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
      {title && (
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={cn(
                "p-2 rounded-lg bg-gray-100 dark:bg-gray-700",
                iconClassName
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <h3 className={cn("font-medium", titleClass)}>{title}</h3>

            {subtitle && (
              <div className="text-xs text-gray-400 ">{subtitle}</div>
            )}
          </div>
        </div>
      )}

      <div className="mt-2">{children}</div>
    </div>
  );
};
