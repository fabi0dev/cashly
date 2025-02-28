import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { InputLabel } from "../InputLabel";

export interface SelectProps {
  value?: string | number;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  label?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export function Select({
  value,
  options,
  placeholder = "Selecione uma opção",
  label,
  className,
  onValueChange,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && <InputLabel>{label}</InputLabel>}
      <SelectRoot
        onValueChange={onValueChange}
        value={value?.toString() ?? ""}
        {...props}
      >
        <SelectTrigger className={cn("w-full", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
