import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { formatCurrency } from "@/lib/utils";
import { useExpenseModal } from "./useExpenseModal";
import { ControlledSelect } from "@/components/ControlledSelect";
import { DatePicker } from "@/components/DatePicker";
import { ExpenseType, RecurrenceTypeLabels } from "./schema";
import { ControlledInput } from "@/components/ControlledInput";
import { ControlledCheckboxInput } from "@/components/ControlledCheckbox";
import { ControlledInputCurrency } from "@/components/ControlledInputCurrency";

interface ExpenseModalProps {
  expenseId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpenseModal({
  expenseId,
  isOpen,
  onClose,
}: ExpenseModalProps) {
  const { submit, isLoading, isLoadingManager, categoriesData, formMethods } =
    useExpenseModal({
      expenseId,
      onClose,
    });

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = formMethods;

  const amount = watch("amount");
  const installments = watch("installments");

  return (
    <Dialog
      title={!expenseId ? "Nova Despesa" : "Editar Despesa"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingManager}
    >
      <form onSubmit={submit} className="space-y-4">
        <ControlledInput
          control={control}
          label="Descrição"
          placeholder="Descrição da despesa"
          name="description"
          autoFocus
          autoComplete="off"
        />

        <div className="flex flex-rows gap-3">
          <div className="flex-1">
            <ControlledSelect
              label="Categoria"
              control={control}
              name="categoryId"
              options={
                categoriesData
                  ?.filter((item) => item.type == "EXPENSE")
                  ?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
              }
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Data da despesa
            </label>
            <DatePicker
              value={watch("date")}
              onValueChange={(date) => setValue("date", date)}
              isError={!!errors.date?.message}
            />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Data de Vencimento
            </label>
            <DatePicker
              value={watch("dueDate")}
              onValueChange={(date) => setValue("dueDate", date)}
              isError={!!errors.dueDate?.message}
            />
          </div>

          <ControlledInputCurrency
            label="Valor"
            name="amount"
            control={control}
          />
        </div>

        <ControlledSelect
          label="Tipo"
          name="type"
          control={control}
          options={Object.entries(ExpenseType).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />

        {watch("type") === "Installments" && (
          <div>
            <div>
              <label className="block text-sm font-medium mb-1">Parcelas</label>

              <Input
                {...register("installments")}
                value={watch("installments")}
              />
            </div>

            {installments > 1 && (
              <div className="text-xs text-gray-600 dark:text-gray-300 pt-2 text-right">
                {watch("installments")}x de {formatCurrency(amount)} ={" "}
                {formatCurrency(amount * installments)}
              </div>
            )}
          </div>
        )}

        {watch("type") === "Recurring" && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Recorrência
            </label>

            <ControlledSelect
              name="recurrenceType"
              control={control}
              options={Object.entries(RecurrenceTypeLabels).map(
                ([key, value]) => ({
                  label: value,
                  value: key,
                })
              )}
            />
          </div>
        )}

        <ControlledCheckboxInput
          control={control}
          name="isPaid"
          label="Despesa paga"
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
