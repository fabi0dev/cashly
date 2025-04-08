import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { Checkbox } from "../ui/checkbox";

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = Pick<
  UseControllerProps<TFieldValues>,
  "name" | "control"
> &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
}: ControlledCheckboxProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex flex-row items-center gap-2 text-sm">
          <Checkbox
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
            disabled={disabled}
          />
          <div className="cursor-pointer hover:opacity-80">{label}</div>
        </label>
      )}
    />
  );
};
