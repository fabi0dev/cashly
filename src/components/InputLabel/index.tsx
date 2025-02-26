import { cn } from "@/lib/utils";

interface InputLabelProps {
  children: string;
  className?: string;
}

export const InputLabel = ({
  children,
  className,
  ...props
}: InputLabelProps) => {
  return (
    <div className={cn("flex mb-1 text-sm", className)} {...props}>
      {children}
    </div>
  );
};
