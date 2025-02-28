import { cn } from "@/lib/utils";

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const FormContainer = ({ className, ...props }: FormContainerProps) => {
  return <form className={cn("space-y-4", className)} {...props} />;
};
