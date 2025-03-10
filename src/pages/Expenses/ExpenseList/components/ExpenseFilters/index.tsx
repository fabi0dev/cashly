import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { schemaExpenseFilters, SchemaExpenseFilters } from "./schema";
import { useFilters } from "@/hooks/useFilters";
import { ControlledInput } from "@/components/ControlledInput";
import { DateRangePicker } from "@/components/DateRangePicker";
import { InputLabel } from "@/components/InputLabel";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { Select } from "@/components/Select";
import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

interface UseExpenseFiltersProps {
  onClose?: () => void;
}

export const ExpenseFilters = ({ onClose }: UseExpenseFiltersProps) => {
  const { setFilters, filteredParams, removeAllFilters } =
    useFilters<SchemaExpenseFilters>({
      schema: schemaExpenseFilters,
    });

  const { handleSubmit, control, setValue, watch } =
    useForm<SchemaExpenseFilters>({
      defaultValues: filteredParams,
    });

  const onSubmit = (data: SchemaExpenseFilters) => {
    setFilters(data);
  };

  const dueDateStart = filteredParams.dueDateStart
    ? DateTime.fromISO(
        filteredParams.dueDateStart || filteredParams.dueDateStart
      ).toJSDate()
    : DateTime.now().startOf("month").toJSDate();

  const dueDateEnd = filteredParams.dueDateEnd
    ? DateTime.fromISO(
        filteredParams.dueDateEnd || filteredParams.dueDateEnd
      ).toJSDate()
    : DateTime.now().endOf("month").toJSDate();

  const { data: categoriesData } = useQuery({
    ...queries.categories.getAll(),
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-5 my-4 rounded-xl">
      <div className="space-y-4 flex flex-row flex-wrap gap-2 items-end">
        <div>
          <ControlledInput
            name="description"
            label="Descrição"
            control={control}
            className={cn("w-[250px]")}
          />
        </div>

        <div>
          <InputLabel>Período</InputLabel>
          <DateRangePicker
            value={{
              from: dueDateStart,
              to: dueDateEnd,
            }}
            onValueChange={(value) => {
              setValue("dueDateStart", value.from);
              setValue("dueDateEnd", value.to);
            }}
          />
        </div>

        <div>
          <Select
            label="Categoria"
            value={watch("categoryId") || undefined}
            onValueChange={(value) => {
              setValue("categoryId", value);
            }}
            options={
              categoriesData
                ?.filter((item) => item.type == "EXPENSE")
                ?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
            }
            className="w-[200px]"
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
