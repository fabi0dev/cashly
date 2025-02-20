import { Container } from "@/components/Container";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, Bell, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const Settings = () => {
  const { setTheme, currentTheme } = useTheme();

  return (
    <Container showHeader={false}>
      <div className="max-w-4xl mx-auto space-y-8 bg-background dark:bg-gray-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-semibold">Configurações</h1>

        {/* Perfil */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <User className="w-5 h-5" /> Perfil
          </h2>
          <Input placeholder="Seu nome" />
          <Input
            placeholder="seu@email.com"
            type="text"
            autoComplete="off"
            autoCorrect="off"
          />
          <Button>Salvar</Button>
        </section>

        {/* Segurança */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Lock className="w-5 h-5" /> Segurança
          </h2>
          <Input placeholder="Nova senha" type="password" />
          <Input placeholder="Confirmar nova senha" type="password" />
          <Button>Alterar Senha</Button>
        </section>

        {/* Notificações */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notificações
          </h2>
          <div className="flex items-center justify-between">
            <span>Receber alertas financeiros</span>
            <Switch />
          </div>
        </section>

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
