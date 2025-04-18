import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/services/expense";
import { Check } from "lucide-react";
import { usePayExpenseModal } from "./usePayExpenseModal";
import { DatePicker } from "@/components/DatePicker";
import { InputLabel } from "@/components/InputLabel";
import { ControlledSelect } from "@/components/ControlledSelect";

interface PayExpenseModalProps {
  onClose: () => void;
  dataExpense: Expense;
}

export const PayExpenseModal = ({
  onClose,
  dataExpense,
}: PayExpenseModalProps) => {
  const { markAsPaid, isLoading, formMethods, listAccounts } =
    usePayExpenseModal({
      expenseId: dataExpense.id,
      onClose,
    });

  const { setValue, watch, control } = formMethods;

  const selectedAccount = listAccounts?.data.find(
    (item) => item.id == watch("accountId")
  );

  console.log(selectedAccount?.balance);
  return (
    <Dialog
      title={"Marcar despesa como paga"}
      description={"Isso irá atualizar da despesa para paga"}
      open
      onOpenChange={onClose}
      isLoading={false}
    >
      <div className="space-y-4">
        <div className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <span className="font-medium">Valor:</span>
            <span>{formatCurrency(dataExpense.amount)}</span>
          </div>

          {dataExpense.description && (
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">Descrição:</span>
              <span>{dataExpense.description}</span>
            </div>
          )}
        </div>

        <div>
          <InputLabel>Data do pagamento</InputLabel>
          <DatePicker
            value={watch("paymentDate")}
            onValueChange={(value) => setValue("paymentDate", value)}
          />
        </div>

        <ControlledSelect
          label="Conta de movimentação"
          control={control}
          name="accountId"
          options={
            listAccounts?.data.map((account) => ({
              value: account.id,
              label: account.name,
            })) || []
          }
        />

        {selectedAccount && (
          <div className="flex flex-col items-end text-xs text-gray-400">
            <div>
              Valor atual da conta:{" "}
              {formatCurrency(selectedAccount?.balance || 0)}
            </div>

            {selectedAccount?.balance <= 0 && (
              <div className="text-red-400">Saldo insuficiente</div>
            )}

            {selectedAccount?.balance > 0 && (
              <div>
                Valor após pagar:{" "}
                {formatCurrency(
                  (selectedAccount?.balance || 0) - dataExpense.amount
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant={"positive"}
          icon={Check}
          onClick={() => markAsPaid()}
          isLoading={isLoading}
          disabled={
            (selectedAccount && selectedAccount?.balance <= 0) ||
            !selectedAccount
          }
        >
          Pago
        </Button>
      </div>
    </Dialog>
  );
};
