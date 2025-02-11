import { Container } from "@/components/Container";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, Bell } from "lucide-react";

export const Settings = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>

        {/* Perfil */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <User className="w-5 h-5" /> Perfil
          </h2>
          <Input placeholder="Seu nome" />
          <Input placeholder="seu@email.com" type="email" />
          <Button>Salvar</Button>
        </section>

        {/* Segurança */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Lock className="w-5 h-5" /> Segurança
          </h2>
          <Input placeholder="********" type="password" />
          <Input placeholder="********" type="password" />
          <Button>Alterar Senha</Button>
        </section>

        {/* Notificações */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notificações
          </h2>
          <div className="flex items-center justify-between">
            <span>Receber notificações por e-mail</span>
            <Switch />
          </div>
        </section>
      </div>
    </Container>
  );
};
