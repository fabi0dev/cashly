import * as Yup from "yup";

export const schemaTransactionModal = Yup.object({
  type: Yup.string().oneOf(["ENTRY", "EXIT"]).required(),
  description: Yup.string(),
  amount: Yup.number().required("Valor é obrigatório"),
  categoryId: Yup.string().required("Categoria é obrigatória"),
  accountId: Yup.string().required("Conta é obrigatória"),
  date: Yup.string().required("Data é obrigatória"),
});

export type SchemaTransactionModal = Yup.InferType<
  typeof schemaTransactionModal
>;
