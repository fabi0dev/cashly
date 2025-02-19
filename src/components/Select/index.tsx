import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectProps {
  value?: string;
  options: { label: string; value: string }[];
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
    <SelectRoot onValueChange={onValueChange} value={value} {...props}>
      <SelectTrigger className={cn("min-w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
