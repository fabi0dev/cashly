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

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Termos de Uso
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4 overflow-auto">
          <div className="p-2">
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                1. Aceitação dos Termos
              </h2>
              <p className="mb-2">
                Ao acessar e usar o serviço Cashly, você concorda em cumprir e
                estar vinculado a estes Termos de Uso. Se você não concordar com
                qualquer parte destes termos, não poderá acessar ou usar nossos
                serviços.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                2. Descrição do Serviço
              </h2>
              <p className="mb-2">
                O Cashly é uma plataforma de gestão financeira que permite aos
                usuários controlar suas finanças pessoais, registrar despesas e
                receitas, e visualizar relatórios financeiros.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">3. Elegibilidade</h2>
              <p className="mb-2">
                Para usar o Cashly, você deve ter pelo menos 18 anos de idade ou
                a maioridade legal em sua jurisdição, o que for maior.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                4. Conta de Usuário
              </h2>
              <p className="mb-2">
                4.1. Você é responsável por manter a confidencialidade de suas
                credenciais de conta e por todas as atividades que ocorrem em
                sua conta.
              </p>
              <p className="mb-2">
                4.2. Você concorda em notificar imediatamente o Cashly sobre
                qualquer uso não autorizado de sua conta ou qualquer outra
                violação de segurança.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">5. Uso Aceitável</h2>
              <p className="mb-2">
                5.1. Você concorda em usar o Cashly apenas para fins legais e de
                acordo com estes Termos.
              </p>
              <p className="mb-2">5.2. Você não deve:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>
                  Usar o serviço de maneira que possa danificar, desabilitar ou
                  sobrecarregar o Cashly
                </li>
                <li>Tentar acessar áreas restritas do serviço</li>
                <li>
                  Usar o serviço para qualquer finalidade ilegal ou não
                  autorizada
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                6. Propriedade Intelectual
              </h2>
              <p className="mb-2">
                Todo o conteúdo, recursos e funcionalidades disponíveis no
                Cashly são propriedade do Cashly ou de seus licenciadores e são
                protegidos por leis de propriedade intelectual.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                7. Modificações do Serviço e dos Termos
              </h2>
              <p className="mb-2">
                7.1. O Cashly reserva-se o direito de modificar ou descontinuar,
                temporária ou permanentemente, o serviço com ou sem aviso
                prévio.
              </p>
              <p className="mb-2">
                7.2. O Cashly pode revisar estes Termos de Uso a qualquer
                momento. A versão mais atual estará sempre disponível em nosso
                site.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                8. Limitação de Responsabilidade
              </h2>
              <p className="mb-2">
                O Cashly não será responsável por quaisquer danos indiretos,
                incidentais, especiais, consequenciais ou punitivos decorrentes
                do uso ou incapacidade de usar o serviço.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">9. Lei Aplicável</h2>
              <p className="mb-2">
                Estes Termos serão regidos e interpretados de acordo com as leis
                do Brasil, sem considerar suas disposições de conflito de leis.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">10. Contato</h2>
              <p className="mb-2">
                Se você tiver alguma dúvida sobre estes Termos, entre em contato
                conosco.
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
