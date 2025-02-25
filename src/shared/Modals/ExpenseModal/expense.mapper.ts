import { ExpenseCreateRequest } from "@/services/expense";
import { SchemaExpenseModal } from "./schema";

const toOnlyType = (data: SchemaExpenseModal): ExpenseCreateRequest => {
  return {
    description: data.description,
    categoryId: data.categoryId,
    amount: data.amount,
    dueDate: data.dueDate,
    date: data.date,
    isPaid: false,
    isRecurring: false,
  };
};

const toInstallmentsType = (data: SchemaExpenseModal): ExpenseCreateRequest => {
  return {
    description: data.description,
    categoryId: data.categoryId,
    amount: data.amount,
    dueDate: data.dueDate,
    installments: data.installments,
  };
};

const toRecurringType = (data: SchemaExpenseModal): ExpenseCreateRequest => {
  return {
    description: data.description,
    categoryId: data.categoryId,
    amount: data.amount,
    dueDate: data.dueDate,
    isPaid: false,
    isRecurring: true,
  };
};

export const ExpenseMapper = {
  toInsert: (data: SchemaExpenseModal): ExpenseCreateRequest => {
    switch (data.type) {
      case "Only":
        return toOnlyType(data);
      case "Installments":
        return toInstallmentsType(data);
      case "Recurring":
        return toRecurringType(data);
    }
  },
};
