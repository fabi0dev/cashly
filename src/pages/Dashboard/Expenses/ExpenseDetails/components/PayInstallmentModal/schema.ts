import { currentDateISO } from "@/lib/date";
import * as Yup from "yup";

export const schemaPayInstallmentModal = Yup.object({
  accountId: Yup.string().required(),
  paymentDate: Yup.string().required().default(currentDateISO()),
});

export type SchemaPayInstallmentModal = Yup.InferType<
  typeof schemaPayInstallmentModal
>;
