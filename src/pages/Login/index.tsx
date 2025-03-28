import { Input } from "@/components/ui/input";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";

export function Login() {
  const { errors, register, submit, isLoading } = useLogin();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full mb-4 gap-1 text-xl font-bold">
            <Logo className="w-[190px]" />
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              E-mail
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Senha
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <Checkbox className="h-4 w-4 rounded bg-violet-600 border-violet-300 focus:ring-violet-400" />
                Lembrar-me
              </label>
            </div>
            <Link to={"/"} className="hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-violet-700 text-white font-medium px-4 py-3 rounded-lg hover:bg-violet-600 transition flex items-center justify-center gap-2 shadow-lg"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Ainda não tem uma conta?{" "}
            <Link
              to={"/register"}
              className="font-medium text-violet-600 hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
