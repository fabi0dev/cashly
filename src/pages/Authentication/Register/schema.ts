import * as Yup from "yup";

export const schemaRegister = Yup.object({
  name: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("O nome é obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

export type SchemaRegister = Yup.InferType<typeof schemaRegister>;
