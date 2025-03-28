import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input } from "../ui/input";
import { InputHTMLAttributes, useState } from "react";
import { InputLabel } from "../InputLabel";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { FormError } from "../FormError";

type ControlledInputProps<TFieldValues extends FieldValues> = Pick<
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
  type,
  ...props
}: ControlledInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {label && <InputLabel>{label}</InputLabel>}
          <div className="relative">
            <Input
              {...field}
              value={field.value ?? ""}
              className={cn(className)}
              data-error={Boolean(error?.message)}
              type={isPassword ? (showPassword ? "text" : "password") : type}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1",
                  "hover:bg-gray-500 transition-colors duration-200 rounded-sm"
                )}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
          </div>

          <FormError error={error} />
        </div>
      )}
    />
  );
};
