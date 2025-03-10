import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";
import { InputLabel } from "../InputLabel";
import { cn } from "@/lib/utils";

export type ControlledInputProps<TFieldValues extends FieldValues> = Pick<
  UseControllerProps<TFieldValues>,
  "name" | "control"
> &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export const ControlledInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  className,
  ...props
}: ControlledInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && <InputLabel>{label}</InputLabel>}
          <Input
            {...field}
            value={field.value ?? ""}
            className={cn(className)}
            data-error={error?.message ? "true" : "false"}
            {...props}
          />
        </div>
      )}
    />
  );
};
