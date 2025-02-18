import * as Yup from "yup";

export const schemaAccountModal = Yup.object({
  name: Yup.string().required("Nome da conta é obrigatório"),
  type: Yup.string().required("Tipo da conta é obrigatório"),
  balance: Yup.number().required("Saldo inicial é obrigatório"),
});

export type SchemaAccountModal = Yup.InferType<typeof schemaAccountModal>;
