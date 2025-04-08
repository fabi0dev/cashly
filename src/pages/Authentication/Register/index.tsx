"use client";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegister } from "./useRegister";
import { Link } from "react-router-dom";
import { ControlledInput } from "@/components/ControlledInput";
import { AuthProvider } from "@/contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { useSocialGoogleLogin } from "../Login/useSocialGoogleLogin";
import { useTheme } from "@/hooks/useTheme";
import { toastError } from "@/lib/toast";
import { ButtonTheme } from "@/components/ButtonTheme";
import { TermsModal } from "./components/TermsModal";
import { useState } from "react";
import { PoliceModal } from "./components/PoliceModal";

export function Register() {
  const { submit, control, isLoadingRegister } = useRegister();
  const { handleSuccess } = useSocialGoogleLogin();
  const { currentTheme } = useTheme();

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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

          <div className="flex items-center gap-2">
            <label htmlFor="terms" className="text-sm">
              Ao me cadastrar eu concordo com os{" "}
              <span
                onClick={() => setShowTermsModal(true)}
                className="text-violet-400 hover:underline"
              >
                Termos de Uso
              </span>{" "}
              e{" "}
              <span
                onClick={() => setShowPrivacyModal(true)}
                className="text-violet-400 hover:underline"
              >
                Política de Privacidade
              </span>
            </label>
          </div>

          <Button
            type="submit"
            isLoading={isLoadingRegister}
            className="w-full"
          >
            Criar minha conta
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

        <div className="text-center my-7 text-xs text-foreground/60">Ou</div>

        <div className="flex justify-center">
          <AuthProvider>
            <GoogleLogin
              theme={currentTheme === "dark" ? "filled_black" : "outline"}
              onSuccess={handleSuccess}
              onError={() =>
                toastError("Não foi possível fazer o login com o Google")
              }
              type="standard"
              shape="circle"
              text="signup_with"
            />
          </AuthProvider>
        </div>
      </div>

      <div className="inlinex-flex fixed bottom-4 right-4">
        <ButtonTheme />
      </div>

      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      <PoliceModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
}
