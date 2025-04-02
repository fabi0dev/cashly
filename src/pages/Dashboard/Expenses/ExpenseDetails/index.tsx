import { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  Edit,
  FileText,
  Tag,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Divider } from "@/components/Divider";
import { Container } from "@/components/Container";
import { cn, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/Card";
import { useExpenseDetails } from "./useExpenseDetails";
import { formatToDateString } from "@/lib/date";
import { PayExpenseModal } from "./components/PayExpenseModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ExpenseModal } from "@/shared/Modals/ExpenseModal";
import { InstallmentItem } from "./components/InstallmentItem";

export const ExpenseDetails = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [markAsPaidDialogOpen, setMarkAsPaidDialogOpen] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const {
    dataExpense,
    isLoadingExpense,
    mutateDeleteExpense,
    isLoadingDeleteExpense,
  } = useExpenseDetails();

  return (
    <Container titleHeader="Detalhes da despesa" isLoading={isLoadingExpense}>
      {dataExpense && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card title={dataExpense.description}>
              <div className="flex items-center space-x-2"></div>

              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Valor</span>
                  <span className="text-3xl font-bold">
                    {formatCurrency(dataExpense.amount)}
                  </span>

                  {dataExpense?.isPaid && (
                    <div
                      className={cn(
                        `inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-full`,
                        `rounded-fullbg-green-50 text-green-600 dark:bg-green-400/10`
                      )}
                    >
                      {dataExpense?.isPaid ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span className="font-medium capitalize">
                        Despesa paga
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-sm text-muted-foreground">
                      {dataExpense.date
                        ? formatToDateString(dataExpense.date)
                        : "Não especificado"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Vencimento</p>
                    <p className="text-sm text-muted-foreground">
                      {dataExpense.dueDate
                        ? formatToDateString(dataExpense.dueDate)
                        : "Não especificado"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">
                      {dataExpense.category?.name || "Uncategorized"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-muted-foreground">
                      {dataExpense.description || "Sem descrição"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {dataExpense.installments &&
              dataExpense.installments.length > 1 && (
                <Card
                  title={`${dataExpense.installments.length} Parcelas`}
                  subtitle={
                    dataExpense.installments.filter((item) => item.isPaid)
                      .length + " pagas"
                  }
                >
                  <div className="space-y-2">
                    {dataExpense.installments.map((installment) => (
                      <InstallmentItem
                        key={installment.id}
                        expenseId={dataExpense.id}
                        installment={installment}
                      />
                    ))}
                  </div>
                </Card>
              )}
          </div>

          <div className="space-y-6">
            {dataExpense.installments.length === 1 && !dataExpense?.isPaid && (
              <Card title="Pagamento">
                {dataExpense.dueDate && (
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      Situação
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        new Date() > new Date(dataExpense.dueDate)
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {new Date() > new Date(dataExpense.dueDate)
                        ? "Em atraso"
                        : `Vence daqui ${Math.ceil(
                            (new Date(dataExpense.dueDate).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )} dias`}
                    </span>
                  </div>
                )}

                <Button
                  onClick={() => setMarkAsPaidDialogOpen(true)}
                  className={cn(
                    "w-full mt-3",
                    dataExpense.isPaid &&
                      "text-white font-semibold bg-gray-600 hover:bg-green-600 hover:text-white"
                  )}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Marcar como pago
                </Button>

                {dataExpense.isPaid && (
                  <div className=" flex flex-row  gap-2 p-2 rounded-lg items-center text-green-700">
                    <Check className="h-5 w-5" /> Despesa paga
                  </div>
                )}
              </Card>
            )}

            <Card title="Ações">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowExpenseModal(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar despesa
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-400"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Apagar
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {markAsPaidDialogOpen && dataExpense && (
        <PayExpenseModal
          dataExpense={dataExpense}
          onClose={() => setMarkAsPaidDialogOpen(false)}
        />
      )}

      {showExpenseModal && (
        <ExpenseModal
          isOpen
          expenseId={dataExpense?.id}
          onClose={() => setShowExpenseModal(false)}
        />
      )}

      {showDeleteDialog && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteExpense}
          onOpenChange={() => setShowDeleteDialog(false)}
          description={
            dataExpense?.installments &&
            dataExpense?.installments.length > 1 ? (
              <div>
                Deseja realmente excluir essa despesa e suas{" "}
                <b>{dataExpense?.installments.length} parcelas</b>?
              </div>
            ) : (
              "Deseja realmente excluir essa despesa?"
            )
          }
          onConfirm={() => mutateDeleteExpense(dataExpense!.id)}
          onCancel={() => setShowDeleteDialog(false)}
          confirmText="Sim quero excluir"
        />
      )}
    </Container>
  );
};
