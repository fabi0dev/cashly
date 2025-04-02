import * as yup from "yup";

export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  })
  .required();

export type SchemaLogin = yup.InferType<typeof schemaLogin>;
