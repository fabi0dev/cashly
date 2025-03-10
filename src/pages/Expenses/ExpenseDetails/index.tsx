import { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  Edit,
  FileText,
  Repeat,
  Tag,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Divider } from "@/components/Divider";
import { Container } from "@/components/Container";
import { cn, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/Card";
import { useExpenseDetails } from "./useExpenseDetails";
import { formatDateLabel, formatToDateString } from "@/lib/date";
import { PayExpenseModal } from "./components/PayExpenseModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Spinner } from "@/components/Spinner";
import { ExpenseModal } from "@/shared/Modals/ExpenseModal";

const formatRecurrenceType = (type: string) => {
  switch (type) {
    case "DAILY":
      return "Daily";
    case "WEEKLY":
      return "Weekly";
    case "MONTHLY":
      return "Monthly";
    case "YEARLY":
      return "Yearly";
    default:
      return type;
  }
};

export const ExpenseDetails = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [markAsPaidDialogOpen, setMarkAsPaidDialogOpen] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const { dataExpense, isLoadingExpense } = useExpenseDetails();

  return (
    <Container titleHeader="Detalhes da despesa">
      {dataExpense && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card title={dataExpense.description}>
              <div className="flex items-center space-x-2">
                {/*  <Badge className={getStatusColor(expense.status)}>
                {expense.status}
              </Badge> */}
                {/*   <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Expense</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setMarkAsPaidDialogOpen(true)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    <span>Mark as Paid</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete Expense</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Valor</span>
                  <span className="text-3xl font-bold">
                    {formatCurrency(dataExpense.amount)}
                  </span>
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

              {dataExpense.isRecurring && (
                <>
                  <Divider />
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Repeat className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-medium">
                        Recurrence Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                      <div>
                        <p className="text-sm font-medium">Frequency</p>
                        <p className="text-sm text-muted-foreground">
                          {formatRecurrenceType(
                            dataExpense.recurrenceType || ""
                          )}
                        </p>
                      </div>
                      {/* <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">
                        {dataExpense.recurrenceStartDate
                          ? format(dataExpense.recurrenceStartDate, "MMMM d, yyyy")
                          : "Not specified"}
                      </p>
                    </div> */}
                      {/*  <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">
                        {dataExpense.recurrenceEndDate
                          ? format(dataExpense.recurrenceEndDate, "MMMM d, yyyy")
                          : "No end date"}
                      </p>
                    </div> */}
                    </div>
                  </div>
                </>
              )}
            </Card>

            {dataExpense.installments &&
              dataExpense.installments.length > 0 && (
                <Card
                  title={
                    dataExpense.installments.length > 1
                      ? `${dataExpense.installments.length} Parcelas`
                      : "Parcela única"
                  }
                  subtitle={
                    dataExpense.installments.filter((item) => item.isPaid)
                      .length + " pagas"
                  }
                >
                  <div className="space-y-2">
                    {dataExpense.installments.map((installment) => (
                      <div
                        key={installment.id}
                        className="flex items-center justify-between p-2 border dark:border-gray-700 rounded-lg"
                      >
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
                              Vencimento:{" "}
                              {formatToDateString(installment.dueDate)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {!installment.isPaid && "Ainda não pago"}

                              {installment.paymentDate &&
                                `Pago ${formatDateLabel(
                                  installment.paymentDate
                                )}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(installment.amount)}
                          </p>

                          {dataExpense.installments.length > 1 && (
                            <p className="text-xs">
                              {new Date() > new Date(installment.dueDate) && (
                                <div className="text-red-500">Em atraso</div>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
          </div>

          <div className="space-y-6">
            <Card title="Pagamento">
              {!dataExpense.isPaid && dataExpense.dueDate && (
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
                className="w-full mt-3"
                variant={dataExpense.isPaid ? "outline" : "default"}
                onClick={() => setMarkAsPaidDialogOpen(true)}
                disabled={dataExpense.isPaid}
              >
                {!dataExpense.isPaid ? (
                  <CreditCard className="mr-2 h-4 w-4" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {dataExpense.isPaid ? "Despesa paga" : "Marcar como pago"}
              </Button>
            </Card>

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

                {/*  {dataExpense.status === "ACTIVE" && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-amber-600"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Expense
                </Button>
              )} */}
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

      {isLoadingExpense && <Spinner />}

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
          isLoading={false}
          onOpenChange={() => setShowDeleteDialog(false)}
          description={"Deseja realmente excluir essa despesa?"}
          onConfirm={() => {}}
          onCancel={() => setShowDeleteDialog(false)}
          confirmText="Sim quero excluir"
        />
      )}
    </Container>
  );
};
