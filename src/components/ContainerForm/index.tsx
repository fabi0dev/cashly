import { cn } from "@/lib/utils";
import { FormEvent, ReactNode } from "react";

type ContainerFormProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent) => void;
  className?: string;
};
export const ContainerForm = ({
  onSubmit,
  className,
  ...props
}: ContainerFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
      {...props}
    />
  );
};
