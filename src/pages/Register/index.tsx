"use client";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegister } from "./useRegister";
import { Link } from "react-router-dom";
import { ControlledInput } from "@/components/ControlledInput";

export function Register() {
  const { submit, control } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full mb-4 gap-1 text-xl font-bold">
            <Wallet size={28} />
            <span>
              Cash<span className="font-black text-violet-500">ly</span>
            </span>
          </div>
          <h1 className="text-xl font-semibold mt-5">Crie sua conta</h1>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <ControlledInput
            label="Nome completo"
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            control={control}
          />

          <ControlledInput
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
            control={control}
          />

          <ControlledInput
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            control={control}
          />

          <ControlledInput
            label="Confirmar senha"
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            control={control}
          />

          <div className="flex items-center gap-2">
            <label htmlFor="terms" className="text-sm">
              Ao cadastrar eu concordo com os{" "}
              <Link to="/terms" className="text-violet-400 hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link to="/privacy" className="text-violet-400 hover:underline">
                Política de Privacidade
              </Link>
            </label>
          </div>

          <Button type="submit" disabled={false} className="w-full">
            Criar conta
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-600 hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
