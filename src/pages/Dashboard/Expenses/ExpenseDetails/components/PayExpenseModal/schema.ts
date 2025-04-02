import { currentDateISO } from "@/lib/date";
import * as Yup from "yup";

export const schemaPayExpenseModal = Yup.object({
  expenseId: Yup.string().required(),
  accountId: Yup.string().required(),
  paymentDate: Yup.string().required().default(currentDateISO()),
});

export type SchemaPayExpenseModal = Yup.InferType<typeof schemaPayExpenseModal>;
