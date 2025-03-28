import * as Yup from "yup";

export const schemaProfile = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
});

export type SchemaProfile = Yup.InferType<typeof schemaProfile>;
