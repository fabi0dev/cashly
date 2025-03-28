import { Container } from "@/components/Container";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Divider } from "@/components/Divider";
import { useAuthStore } from "@/store/authStore";

export const Settings = () => {
  const { setTheme, currentTheme } = useTheme();
  const user = useAuthStore((state) => state.authData?.user);

  return (
    <Container titleHeader="Configurações">
      <div className=" bg-background dark:bg-gray-800 p-8 px-10 rounded-2xl">
        <section className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <User className="w-5 h-5" /> Perfil
          </h2>
          <Input placeholder="Seu nome" value={user?.name} readOnly />
          <Input
            placeholder="seu@email.com"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            value={user?.email}
            readOnly
          />
          <Button disabled>Salvar</Button>
        </section>

        <Divider />

        <section className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
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
