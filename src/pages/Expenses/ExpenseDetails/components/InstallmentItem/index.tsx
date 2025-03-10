import { Button } from "@/components/ui/button";
import { formatDateLabel, formatToDateString } from "@/lib/date";
import { cn, formatCurrency } from "@/lib/utils";
import { Installment } from "@/services/expense";
import { PayInstallmentModal } from "../PayInstallmentModal";
import { useState } from "react";

interface InstallmentItemProps {
  expenseId: string;
  installment: Installment;
}

export const InstallmentItem = ({
  expenseId,
  installment,
}: InstallmentItemProps) => {
  const [payInstallmentModal, setPayInstallmentModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-2 border dark:border-gray-700 rounded-lg">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              `w-1 h-8 rounded-full opacity-75 `,
              !installment.isPaid && "bg-amber-500",
              new Date() > new Date(installment.dueDate) &&
                !installment.isPaid &&
                "bg-red-500",
              installment.isPaid && "bg-green-500"
            )}
          />
          <div>
            <p className="font-medium">
              Parcela {installment.installmentNumber} - Vencimento:{" "}
              {formatToDateString(installment.dueDate)}
            </p>
            <p className="text-sm text-muted-foreground">
              {!installment.isPaid && "Ainda não pago"}

              {installment.paymentDate &&
                `Pago ${formatDateLabel(installment.paymentDate)}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(installment.amount)}</p>

          <p className="text-xs">
            {new Date() > new Date(installment.dueDate) &&
              !installment.isPaid && (
                <div className="text-red-500">Em atraso</div>
              )}
          </p>
        </div>
        <div>
          {!installment.isPaid && (
            <Button onClick={() => setPayInstallmentModal(true)}>Pagar</Button>
          )}
        </div>
      </div>

      {payInstallmentModal && (
        <PayInstallmentModal
          expenseId={expenseId}
          installment={installment}
          onClose={() => setPayInstallmentModal(false)}
        />
      )}
    </>
  );
};
