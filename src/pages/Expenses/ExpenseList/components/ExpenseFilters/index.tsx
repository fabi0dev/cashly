import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { schemaExpenseFilters, SchemaExpenseFilters } from "./schema";
import { useFilters } from "@/hooks/useFilters";
import { ControlledInput } from "@/components/ControlledInput";
import { DateRangePicker } from "@/components/DateRangePicker";
import { InputLabel } from "@/components/InputLabel";
import { DateTime } from "luxon";

interface UseExpenseFiltersProps {
  onClose?: () => void;
}

export const ExpenseFilters = ({ onClose }: UseExpenseFiltersProps) => {
  const { setFilters, filteredParams, removeAllFilters } =
    useFilters<SchemaExpenseFilters>({
      schema: schemaExpenseFilters,
    });

  const { handleSubmit, control, setValue } = useForm<SchemaExpenseFilters>({
    defaultValues: filteredParams,
  });

  console.log(filteredParams);

  const onSubmit = (data: SchemaExpenseFilters) => {
    setFilters(data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 my-4 rounded-xl">
      <div className="space-y-4 flex flex-row gap-2 items-end">
        <div>
          <ControlledInput
            name="description"
            label="Descrição"
            control={control}
          />
        </div>

        <div>
          <InputLabel>Período</InputLabel>
          <DateRangePicker
            value={{
              from: filteredParams.dueDateStart
                ? DateTime.fromISO(filteredParams.dueDateStart).toJSDate()
                : undefined,
              to: filteredParams.dueDateEnd
                ? DateTime.fromISO(filteredParams.dueDateEnd).toJSDate()
                : undefined,
            }}
            onValueChange={(value) => {
              setValue("dueDateStart", value.from);
              setValue("dueDateEnd", value.to);
            }}
          />
        </div>

        <div className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              removeAllFilters();
              onClose?.();
            }}
          >
            Limpar
          </Button>

          <Button onClick={handleSubmit(onSubmit)}>Aplicar</Button>
        </div>
      </div>
    </div>
  );
};
