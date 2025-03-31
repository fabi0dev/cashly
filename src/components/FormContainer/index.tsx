import { cn } from "@/lib/utils";

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const FormContainer = ({ className, ...props }: FormContainerProps) => {
  return <form className={cn("space-y-4", className)} {...props} />;
};

FormContainer.Column = ({
  children,
  className,
  cols,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cols?: number;
}) => {
  return (
    <div className={cn(`grid grid-cols-${cols} gap-4`, className)} {...props}>
      {children}
    </div>
  );
};
