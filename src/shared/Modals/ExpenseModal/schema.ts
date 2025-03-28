import * as Yup from "yup";

export const expenseSchema = Yup.object({
  type: Yup.string<ExpenseTypeKeys>().default("Only"),
  amount: Yup.number().required(),
  categoryId: Yup.string().required(),
  date: Yup.string(),
  dueDate: Yup.string().required(),
  description: Yup.string(),

  isPaid: Yup.boolean().default(false),

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

export const ExpenseType = {
  Only: "Pagamento Único",
  Installments: "Parcelado",
};

type ExpenseTypeKeys = keyof typeof ExpenseType;
