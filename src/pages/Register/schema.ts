import * as Yup from "yup";

export const registerFormSchema = Yup.object({
  name: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("O nome é obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});

export type RegisterFormData = Yup.InferType<typeof registerFormSchema>;
