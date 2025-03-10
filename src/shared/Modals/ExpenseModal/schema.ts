import { RecurrenceType } from "@/services/expense";
import * as Yup from "yup";

export const expenseSchema = Yup.object({
  type: Yup.string<ExpenseTypeKeys>().default("Only"),
  amount: Yup.number().required(),
  categoryId: Yup.string().required(),
  date: Yup.string(),
  dueDate: Yup.string().required(),
  description: Yup.string(),

  isRecurring: Yup.boolean().default(false),
  isPaid: Yup.boolean().default(false),

  recurrenceType: Yup.string<RecurrenceType>()
    .oneOf(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
    .when("isRecurring", {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),

  recurrenceEndDate: Yup.string(),

  installments: Yup.number()
    .min(2)
    .default(2)
    .when("type", {
      is: "Installments",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export type SchemaExpenseModal = Yup.InferType<typeof expenseSchema>;

export const RecurrenceTypeLabels = {
  DAILY: "Diária",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
};

export const ExpenseType = {
  Only: "Pagamento Único",
  Recurring: "Recorrente",
  Installments: "Parcelado",
};

type ExpenseTypeKeys = keyof typeof ExpenseType;
