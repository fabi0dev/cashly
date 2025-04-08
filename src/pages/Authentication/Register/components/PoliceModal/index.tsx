"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PoliceModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Política de Privacidade
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4 overflow-auto">
          <div className="p-2">
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
              <p className="mb-2">
                Esta Política de Privacidade descreve como o Cashly coleta, usa
                e compartilha suas informações pessoais quando você usa nosso
                serviço.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                2. Informações que Coletamos
              </h2>
              <p className="mb-2">
                <strong>2.1. Informações que você nos fornece:</strong>
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>
                  Informações de registro, como nome, endereço de e-mail e senha
                </li>
                <li>
                  Dados financeiros que você insere no aplicativo, como
                  transações, categorias e orçamentos
                </li>
                <li>Comunicações que você envia para nós</li>
              </ul>

              <p className="mb-2">
                <strong>2.2. Informações coletadas automaticamente:</strong>
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>Dados de uso e interação com o aplicativo</li>
                <li>
                  Informações do dispositivo, como tipo de dispositivo, sistema
                  operacional e navegador
                </li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                3. Como Usamos Suas Informações
              </h2>
              <p className="mb-2">Usamos suas informações para:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar e gerenciar sua conta</li>
                <li>
                  Comunicar-nos com você sobre atualizações, recursos e ofertas
                </li>
                <li>Personalizar sua experiência</li>
                <li>
                  Detectar, prevenir e resolver problemas técnicos e de
                  segurança
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                4. Compartilhamento de Informações
              </h2>
              <p className="mb-2">
                4.1. Não vendemos suas informações pessoais a terceiros.
              </p>
              <p className="mb-2">
                4.2. Podemos compartilhar suas informações com:
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>Provedores de serviços que nos ajudam a operar o Cashly</li>
                <li>Autoridades legais quando exigido por lei</li>
                <li>Parceiros de negócios com seu consentimento explícito</li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                5. Segurança de Dados
              </h2>
              <p className="mb-2">
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger suas informações pessoais contra acesso não
                autorizado, perda ou alteração.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                6. Seus Direitos de Privacidade
              </h2>
              <p className="mb-2">
                Dependendo da sua localização, você pode ter direitos
                relacionados aos seus dados pessoais, incluindo:
              </p>
              <ul className="list-disc pl-6 mb-2">
                <li>Acesso às suas informações pessoais</li>
                <li>Correção de informações imprecisas</li>
                <li>Exclusão de suas informações</li>
                <li>Restrição ou objeção ao processamento</li>
                <li>Portabilidade de dados</li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                7. Retenção de Dados
              </h2>
              <p className="mb-2">
                Mantemos suas informações pessoais pelo tempo necessário para
                fornecer nossos serviços ou conforme exigido por lei.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">8. Crianças</h2>
              <p className="mb-2">
                O Cashly não é destinado a crianças menores de 13 anos, e não
                coletamos intencionalmente informações pessoais de crianças.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                9. Alterações nesta Política
              </h2>
              <p className="mb-2">
                Podemos atualizar esta Política de Privacidade periodicamente.
                Notificaremos você sobre quaisquer alterações significativas.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">10. Contato</h2>
              <p className="mb-2">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre
                em contato conosco.
              </p>
            </section>

            <p className="flex justify-center text-xs text-gray-500 mt-6">
              Última atualização: 08 de abril de 2025
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
