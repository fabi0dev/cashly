import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { pt } from "date-fns/locale/pt";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTime } from "luxon";

type DatePickerProps = {
  value?: string;
  onValueChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
  isError?: boolean;
};

export function DatePicker({
  value,
  onValueChange,
  placeholder = "Selecione uma data",
  className,
  isError,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);

    if (selectedDate) {
      onValueChange?.(DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd"));
    }
  };

  React.useEffect(() => {
    if (value) setDate(DateTime.fromFormat(value, "yyyy-MM-dd").toJSDate());
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "relative w-full justify-start text-left font-normal bg-input dark:hover:bg-input border border-input-foreground",
            !date && "text-muted-foreground",
            "data-[error]:border data-[error=true]:border-red-500 dark:data-[error=true]:border-red-500",
            className
          )}
          data-error={isError}
        >
          <CalendarIcon className="absolute right-3 h-4 w-4" />
          {date ? (
            DateTime.fromJSDate(date).setLocale("pt-BR").toFormat("DDD")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          locale={pt}
        />
      </PopoverContent>
    </Popover>
  );
}
