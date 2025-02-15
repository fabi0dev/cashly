import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function DatePicker({
  value,
  onChange,
}: {
  value: string | undefined; // Aceita string no formato YYYY-MM-DD
  onChange: (date: string) => void; // Retorna string no formato YYYY-MM-DD
}) {
  const parseDate = (dateStr: string | undefined) =>
    dateStr ? new Date(dateStr + "T00:00:00") : undefined;

  const formatDate = (date: Date) => date.toISOString().split("T")[0]; // Formata para YYYY-MM-DD

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    parseDate(value)
  );

  React.useEffect(() => {
    setSelectedDate(parseDate(value));
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = formatDate(date);
      setSelectedDate(date);
      onChange(formatted);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-80">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
