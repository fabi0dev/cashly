import * as Yup from "yup";

export const schemaTransactionModal = Yup.object({
  type: Yup.string().oneOf(["income", "expense"]).required(),
  description: Yup.string().required("Descrição é obrigatória"),
  amount: Yup.number()
    .typeError("Valor deve ser um número")
    .positive("Valor deve ser positivo")
    .required("Valor é obrigatório"),
  category: Yup.string().required("Categoria é obrigatória"),
  date: Yup.string().required("Data é obrigatória"),
});

export type SchemaTransactionModal = Yup.InferType<
  typeof schemaTransactionModal
>;
