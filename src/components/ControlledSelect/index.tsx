import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Select, SelectProps } from "../Select";
import { cn } from "@/lib/utils";

export type ControlledSelectProps<TFieldValues extends FieldValues> = Pick<
  UseControllerProps<TFieldValues>,
  "name" | "control"
> &
  SelectProps & {
    autoFocus?: boolean;
  };

export const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  options,
  placeholder = "Selecione uma opção",
  label,
  className,
  control,
  ...props
}: ControlledSelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            options={options}
            placeholder={placeholder}
            label={label}
            className={cn(className)}
            isError={!!error?.message}
            {...props}
          />
        );
      }}
    />
  );
};
