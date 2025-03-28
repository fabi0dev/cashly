import { Container } from "@/components/Container";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Divider } from "@/components/Divider";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "./useProfile";
import { ControlledInput } from "@/components/ControlledInput";

export const Settings = () => {
  const { setTheme, currentTheme } = useTheme();
  const user = useAuthStore((state) => state.authData?.user)!;

  const {
    control: controlProfile,
    submit: submitProfile,
    isLoadingUpdateProfile,
  } = useProfile();

  return (
    <Container titleHeader="Configurações">
      <div className=" bg-background dark:bg-gray-800 p-8 px-10 rounded-2xl">
        <section>
          <div className="text-xl font-medium flex items-center gap-2">
            <User className="w-5 h-5" /> Perfil
          </div>
          <div className="text-foreground/60 text-sm">{user?.email}</div>

          <div className="space-y-4 mt-4">
            <ControlledInput
              label="Nome"
              name="name"
              placeholder="Seu nome"
              control={controlProfile}
            />

            <Button onClick={submitProfile} isLoading={isLoadingUpdateProfile}>
              Salvar
            </Button>
          </div>
        </section>

        <Divider />

        <section className="space-y-4">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <Sun className="w-5 h-5" /> Tema
          </h2>
          <div className="flex items-center justify-between">
            <span>Modo escuro</span>
            <Switch
              checked={currentTheme == "dark"}
              onCheckedChange={() => {
                setTheme(currentTheme == "dark" ? "light" : "dark");
              }}
            />
          </div>
        </section>
      </div>
    </Container>
  );
};
