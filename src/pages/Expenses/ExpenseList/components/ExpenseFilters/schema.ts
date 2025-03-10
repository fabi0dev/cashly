import * as Yup from "yup";

export const schemaExpenseFilters = Yup.object({
  description: Yup.string().default(""),
  dueDateStart: Yup.string(),
  dueDateEnd: Yup.string(),
  categoryId: Yup.string(),
});

export type SchemaExpenseFilters = Yup.InferType<typeof schemaExpenseFilters>;
