import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}
export const Spinner = ({ size = 16, className, ...props }: SpinnerProps) => (
  <Loader size={size} className={cn("animate-spin", className)} {...props} />
);
