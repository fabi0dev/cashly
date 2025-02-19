import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Login() {
  const { errors, register, submit, isLoading } = useLogin();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full mb-4 gap-1 text-black text-xl font-bold">
            <Wallet size={28} />
            <span>
              Cash<span className="font-black text-purple-500">ly</span>
            </span>
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
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded bg-purple-600 border-purple-300 focus:ring-purple-400"
              />
              <label htmlFor="remember">Lembrar-me</label>
            </div>
            <Link to={"/"} className="hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-purple-700 text-white font-medium px-4 py-3 rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-2 shadow-lg"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Ainda não tem uma conta?{" "}
            <Link
              to={"/"}
              className="font-medium text-purple-600 hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
