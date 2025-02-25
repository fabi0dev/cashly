import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { CurrencyInput } from "react-currency-mask";
import { cn, formatCurrency } from "@/lib/utils";
import { useExpenseModal } from "./useExpenseModal";
import { ControlledSelect } from "@/components/ControlledSelect";
import { DatePicker } from "@/components/DatePicker";
import { ExpenseType, RecurrenceTypeLabels } from "./schema";

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
  const {
    register,
    setValue,
    errors,
    watch,
    submit,
    isLoading,
    isLoadingManager,
    categoriesData,
    control,
  } = useExpenseModal({
    expenseId,
    onClose,
  });

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
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <Input
            {...register("description")}
            placeholder="Descrição da despesa"
            className={cn(errors.description?.message && "border-red-400")}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="flex flex-rows gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <ControlledSelect
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
              className={cn(errors.categoryId?.message && "border-red-400")}
            />
          </div>

          <div className="flex-2">
            <label className="block text-sm font-medium mb-1">Valor</label>
            <CurrencyInput
              value={watch("amount")}
              onChangeValue={(_, value) => setValue("amount", Number(value))}
              InputElement={
                <Input
                  placeholder="0,00"
                  className={cn(errors.amount?.message && "border-red-400")}
                />
              }
              currency={"BRL"}
            />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Data da despesa
            </label>
            <DatePicker
              value={watch("date")}
              onValueChange={(date) => setValue("date", date)}
              className={cn(errors.date?.message && "border-red-400")}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Data de Vencimento
            </label>
            <DatePicker
              value={watch("dueDate")}
              onValueChange={(date) => setValue("dueDate", date)}
              className={cn(errors.dueDate?.message && "border-red-400")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <ControlledSelect
            name="type"
            control={control}
            options={Object.entries(ExpenseType).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
          />
        </div>

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

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
