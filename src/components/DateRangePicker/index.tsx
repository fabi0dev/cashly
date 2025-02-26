"use client";

import * as React from "react";
import { DateTime } from "luxon";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { pt } from "date-fns/locale/pt";

type ValueChange = {
  from: string;
  to: string;
};

interface DateRangePickerProps {
  value?: DateRange;
  onValueChange?: (date: ValueChange) => void;
  onChange?: (date: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  value,
  onValueChange,
  onChange,
  className,
}: DateRangePickerProps) {
  const initialRange: DateRange = {
    from: DateTime.now().minus({ months: 1 }).startOf("month").toJSDate(),
    to: DateTime.now().endOf("month").toJSDate(),
  };

  const [date, setDate] = React.useState<DateRange | undefined>(
    value || initialRange
  );

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);

    if (selectedDate?.from && selectedDate?.to) {
      const rangeDate = {
        from: DateTime.fromJSDate(selectedDate.from).toFormat("yyyy-MM-dd"),
        to: DateTime.fromJSDate(selectedDate.to).toFormat("yyyy-MM-dd"),
      };

      onValueChange?.(rangeDate);
    }
  };

  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-auto justify-start text-left font-normal bg-input hover:bg-input",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {DateTime.fromJSDate(date.from)
                    .setLocale("pt-BR")
                    .toFormat("LLL dd, y")}{" "}
                  até{" "}
                  {DateTime.fromJSDate(date.to)
                    .setLocale("pt-BR")
                    .toFormat("LLL dd, y")}
                </>
              ) : (
                DateTime.fromJSDate(date.from)
                  .setLocale("pt-BR")
                  .toFormat("LLL dd, y")
              )
            ) : (
              <span>Intervalo de data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            locale={pt}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
