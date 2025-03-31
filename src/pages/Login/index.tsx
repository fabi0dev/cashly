import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { ControlledInput } from "@/components/ControlledInput";
import { AuthProvider } from "@/contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { toastError } from "@/lib/toast";
import { useTheme } from "@/hooks/useTheme";
import { useSocialGoogleLogin } from "./useSocialGoogleLogin";
import { LoadingScreen } from "./components/LoadingScreen";
import { ButtonTheme } from "@/components/ButtonTheme";

export function Login() {
  const { formMethods, submit, isLoading } = useLogin();
  const { control } = formMethods;
  const { handleSuccess, isLoadingAuthGoogle } = useSocialGoogleLogin();
  const { currentTheme } = useTheme();

  if (isLoadingAuthGoogle) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full mb-4 gap-1 text-xl font-bold">
            <Logo className="w-[190px]" />
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <ControlledInput
            label="E-mail"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            control={control}
            autoFocus
          />

          <ControlledInput
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            control={control}
          />

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
              text="signin_with"
            />
          </AuthProvider>
        </div>
      </div>

      <div className="inlinex-flex fixed bottom-4 right-4">
        <ButtonTheme />
      </div>
    </div>
  );
}
