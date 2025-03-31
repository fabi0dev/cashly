import * as Yup from "yup";

export const schemaCategoryModal = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  importanceLevel: Yup.number().oneOf([1, 2, 3]).required().default(2),
  isFavorite: Yup.boolean().required().default(false),
  type: Yup.string().oneOf(["EXPENSE", "INCOME"]).required().default("EXPENSE"),
});

export type SchemaCategoryModal = Yup.InferType<typeof schemaCategoryModal>;
