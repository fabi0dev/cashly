import { AccountsTypesKey } from "@/constants/AccountsTypes";
import * as Yup from "yup";

export const schemaAccountModal = Yup.object({
  name: Yup.string().required("Nome da conta é obrigatório"),
  isDefault: Yup.boolean().default(false),
  type: Yup.string<AccountsTypesKey>().required("Tipo da conta é obrigatório"),
  balance: Yup.number().required("Saldo inicial é obrigatório").default(0),
});

export type SchemaAccountModal = Yup.InferType<typeof schemaAccountModal>;
