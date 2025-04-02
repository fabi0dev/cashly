import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/Dialog";
import { FormContainer } from "@/components/FormContainer";
import { ControlledSelect } from "@/components/ControlledSelect";
import { ControlledInput } from "@/components/ControlledInput";
import { ControlledCheckboxInput } from "@/components/ControlledCheckbox";
import { ControlledInputCurrency } from "@/components/ControlledInputCurrency";
import { ControlledDatePicker } from "@/components/ControlledDatePicker";
import { formatCurrency } from "@/lib/utils";
import { useExpenseModal } from "./useExpenseModal";
import { ExpenseType } from "./schema";

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

  const { watch, control } = formMethods;
  const amount = watch("amount");
  const installments = watch("installments");

  return (
    <Dialog
      title={!expenseId ? "Nova Despesa" : "Editar Despesa"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingManager}
    >
      <FormContainer onSubmit={submit} className="space-y-4">
        <FormContainer.Column>
          <ControlledInput
            control={control}
            label="Descrição"
            placeholder="Descrição da despesa"
            name="description"
            autoComplete="off"
            autoFocus
          />
        </FormContainer.Column>

        <FormContainer.Column cols={2}>
          <ControlledSelect
            label="Categoria"
            control={control}
            name="categoryId"
            options={
              categoriesData
                ?.filter((item) => item.type == "EXPENSE")
                ?.map((item) => ({ label: item.name, value: item.id })) || []
            }
            disabled={!!expenseId}
          />
          <ControlledDatePicker
            control={control}
            name="dueDate"
            label="Data de Vencimento"
            disabled={!!expenseId}
          />
        </FormContainer.Column>

        <FormContainer.Column cols={2}>
          <ControlledDatePicker
            control={control}
            name="date"
            label="Data da despesa"
            disabled={!!expenseId}
          />

          <ControlledInputCurrency
            label="Valor"
            name="amount"
            control={control}
            disabled={!!expenseId}
          />
        </FormContainer.Column>

        <ControlledSelect
          label="Tipo"
          name="type"
          control={control}
          options={Object.entries(ExpenseType).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          disabled={!!expenseId}
        />

        {watch("type") === "Installments" && (
          <div>
            <ControlledInput
              label="Parcelas"
              name="installments"
              control={control}
              isNumber
              disabled={!!expenseId}
            />
            {installments > 1 && amount && (
              <div className="text-xs text-gray-600 dark:text-gray-300 pt-2 text-right">
                {installments}x de {formatCurrency(amount)} ={" "}
                {formatCurrency(amount * installments)}
              </div>
            )}
          </div>
        )}

        <ControlledCheckboxInput
          control={control}
          name="isPaid"
          label="Despesa paga"
          disabled={!!expenseId}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </FormContainer>
    </Dialog>
  );
}
