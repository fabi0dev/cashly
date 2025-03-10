import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";
import { InputLabel } from "../InputLabel";
import { cn } from "@/lib/utils";
import { CurrencyInput } from "react-currency-mask";

export type ControlledInputCurrencyProps<TFieldValues extends FieldValues> =
  Pick<UseControllerProps<TFieldValues>, "name" | "control"> &
    InputHTMLAttributes<HTMLInputElement> & {
      label?: string;
    };

export const ControlledInputCurrency = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  className,
  ...props
}: ControlledInputCurrencyProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            {label && <InputLabel>{label}</InputLabel>}

            <CurrencyInput
              value={field.value}
              onChangeValue={(_, value) => field.onChange(Number(value))}
              InputElement={
                <Input
                  placeholder="R$ 0,00"
                  className={cn(className)}
                  data-error={!!error?.message}
                  {...props}
                />
              }
              currency={"BRL"}
            />
          </div>
        );
      }}
    />
  );
};
