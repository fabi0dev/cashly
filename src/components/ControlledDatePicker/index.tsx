import { InputHTMLAttributes } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { DatePicker } from "../DatePicker";
import { InputLabel } from "../InputLabel";
import { FormError } from "../FormError";

type ControlledDatePickerProps<TFieldValues extends FieldValues> = Pick<
  UseControllerProps<TFieldValues>,
  "name" | "control"
> &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    placeholder?: string;
  };
export const ControlledDatePicker = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  placeholder,
}: ControlledDatePickerProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && <InputLabel>{label}</InputLabel>}
          <DatePicker
            value={field.value ?? ""}
            onValueChange={(value) => field.onChange(value)}
            placeholder={placeholder}
          />

          <FormError error={error} />
        </div>
      )}
    />
  );
};
