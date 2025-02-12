import * as Yup from "yup";

export const schemaGoalModal = Yup.object().shape({
  name: Yup.string().required("O nome da meta é obrigatório"),
  targetAmount: Yup.number()
    .typeError("O valor alvo deve ser um número")
    .positive("O valor alvo deve ser maior que zero")
    .required("O valor alvo é obrigatório"),
  currentAmount: Yup.number()
    .typeError("O valor atual deve ser um número")
    .min(0, "O valor atual não pode ser negativo")
    .required("O valor atual é obrigatório"),
  deadline: Yup.string().required("A data limite é obrigatória"),
  color: Yup.string().required("A cor é obrigatória"),
  icon: Yup.string().required("O ícone é obrigatório"),
});

export type SchemaGoalModal = Yup.InferType<typeof schemaGoalModal>;
