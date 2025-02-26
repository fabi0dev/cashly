import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Select, SelectProps } from "../Select";

export type ControlledSelectProps<TFieldValues extends FieldValues> = Pick<
  UseControllerProps<TFieldValues>,
  "name" | "control"
> &
  SelectProps;

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
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          options={options}
          placeholder={placeholder}
          label={label}
          className={className}
          {...props}
        />
      )}
    />
  );
};
