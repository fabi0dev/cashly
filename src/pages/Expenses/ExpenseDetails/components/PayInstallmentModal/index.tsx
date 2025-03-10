import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Installment } from "@/services/expense";
import { Check } from "lucide-react";
import { usePayInstallmentModal } from "./usePayInstallmentModal";
import { DatePicker } from "@/components/DatePicker";
import { InputLabel } from "@/components/InputLabel";
import { ControlledSelect } from "@/components/ControlledSelect";

interface PayInstallmentModalProps {
  onClose: () => void;
  installment: Installment;
  expenseId: string;
}

export const PayInstallmentModal = ({
  onClose,
  installment,
  expenseId,
}: PayInstallmentModalProps) => {
  const { markAsPaid, isLoading, formMethods, listAccounts, dataExpense } =
    usePayInstallmentModal({
      installmentId: installment.id,
      expenseId,
      onClose,
    });

  const { setValue, watch, control } = formMethods;
  const selectedAccount = listAccounts?.data.find(
    (item) => item.id == watch("accountId")
  );

  return (
    <Dialog
      title={`Pagar parcela ${installment.installmentNumber}/${dataExpense?.installments.length}`}
      description={"Isso irá atualizar a situação dessa parcela para paga"}
      open
      onOpenChange={onClose}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <div className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <span className="font-medium">Valor:</span>
            <span>{formatCurrency(installment.amount)}</span>
          </div>

          {dataExpense?.description && (
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
        <div className="flex flex-col items-end text-xs text-gray-400">
          <div>
            Valor atual da conta:{" "}
            {formatCurrency(selectedAccount?.balance || 0)}
          </div>
          <div>
            Valor após pagar:{" "}
            {formatCurrency(
              (selectedAccount?.balance || 0) - installment.amount
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant={"positive"}
          icon={Check}
          onClick={markAsPaid}
          isLoading={isLoading}
        >
          Pago
        </Button>
      </div>
    </Dialog>
  );
};
