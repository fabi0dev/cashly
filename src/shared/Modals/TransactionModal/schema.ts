import * as Yup from "yup";

export const schemaTransactionModal = Yup.object({
  type: Yup.string().oneOf(["ENTRY", "EXIT"]).required(),
  description: Yup.string(),
  amount: Yup.number().required("Valor é obrigatório"),
  category: Yup.string().required("Categoria é obrigatória"),
  date: Yup.string().required("Data é obrigatória"),
});

export type SchemaTransactionModal = Yup.InferType<
  typeof schemaTransactionModal
>;
