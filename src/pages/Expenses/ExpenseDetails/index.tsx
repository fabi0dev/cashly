"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  Edit,
  FileText,
  Repeat,
  Tag,
  Trash,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Divider } from "@/components/Divider";
import { Container } from "@/components/Container";
import { cn, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/Card";
import { useExpenseDetails } from "./useExpenseDetails";
import { formatToDateString } from "@/lib/date";

const expense = {
  id: "clj2hf8xt0000qw3v5nj7e0q1",
  amount: 1250.75,
  categoryId: "cat123",
  date: new Date("2023-06-15"),
  dueDate: new Date("2023-06-30"),
  isPaid: false,
  description: "Annual Insurance Premium",
  userId: "user123",
  isRecurring: true,
  recurrenceType: "YEARLY",
  recurrenceStartDate: new Date("2025-06-15"),
  recurrenceEndDate: new Date("2026-06-15"),
  status: "COMPLETED",
  createdAt: new Date("2023-06-10"),
  updatedAt: new Date("2023-06-10"),
  deletedAt: null,
  category: {
    id: "cat123",
    name: "Insurance",
    color: "#3b82f6",
    icon: "shield",
  },
  installments: [
    {
      id: "inst1",
      expenseId: "clj2hf8xt0000qw3v5nj7e0q1",
      dueDate: new Date("2023-06-30"),
      amount: 1250.75,
      isPaid: false,
      paymentDate: null,
    },
    {
      id: "inst2",
      expenseId: "clj2hf8xt0000qw3v5nj7e0q1",
      dueDate: new Date("2023-06-30"),
      amount: 1250.75,
      isPaid: false,
      paymentDate: null,
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "CANCELED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [markAsPaidDialogOpen, setMarkAsPaidDialogOpen] = useState(false);

  const { dataExpense, isLoadingExpense } = useExpenseDetails();

  if (!dataExpense) {
    return null;
  }

  return (
    <Container titleHeader="Detalhes da despesa">
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
                    {expense.dueDate
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
                    <h3 className="text-sm font-medium">Recurrence Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                    <div>
                      <p className="text-sm font-medium">Frequency</p>
                      <p className="text-sm text-muted-foreground">
                        {formatRecurrenceType(expense.recurrenceType || "")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.recurrenceStartDate
                          ? format(expense.recurrenceStartDate, "MMMM d, yyyy")
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.recurrenceEndDate
                          ? format(expense.recurrenceEndDate, "MMMM d, yyyy")
                          : "No end date"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>

          {dataExpense.installments && dataExpense.installments.length > 0 && (
            <Card
              title={
                dataExpense.installments.length > 1
                  ? `${dataExpense.installments.length} Parcelas`
                  : "Parcela única"
              }
              subtitle={
                dataExpense.installments.filter((item) => item.isPaid).length +
                " pagas"
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
                          Vencimento: {formatToDateString(installment.dueDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {installment.isPaid
                            ? `Pago em ${format(
                                installment.paymentDate || new Date(),
                                "MMMM d, yyyy"
                              )}`
                            : "Ainda não pago"}
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
                <span className="text-sm text-muted-foreground">Situação</span>
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
                        (expense.dueDate.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} dias`}
                </span>
              </div>
            )}
            <Button
              className="w-full mt-3"
              variant={expense.isPaid ? "outline" : "default"}
              onClick={() => setMarkAsPaidDialogOpen(true)}
              disabled={expense.isPaid}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {expense.isPaid ? "Já pago" : "Marcar como pago"}
            </Button>
          </Card>

          <Card title="Ações">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Editar despesa
              </Button>

              {expense.status === "ACTIVE" && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-amber-600"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Expense
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start text-red-600"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Apagar
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog
        open={markAsPaidDialogOpen}
        onOpenChange={setMarkAsPaidDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Expense as Paid</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this expense as paid? This will
              update the payment status.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Amount:</span>
              <span>{formatCurrency(expense.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Description:</span>
              <span>{expense.description}</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMarkAsPaidDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle marking as paid
                setMarkAsPaidDialogOpen(false);
                // In a real app, you would call an API here
              }}
            >
              Mark as Paid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="flex items-center p-4 border rounded-lg bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
              <p className="text-sm">
                This will permanently delete the expense and all associated
                data.
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                // Handle delete
                setDeleteDialogOpen(false);
                // In a real app, you would call an API here
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
};
