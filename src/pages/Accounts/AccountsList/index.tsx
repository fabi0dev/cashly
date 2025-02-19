import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AccountModal } from "@/shared/Modals/AccountModal";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { AccountItem } from "./components/AccountItem";

export const AccountsList = () => {
  const { isLoading: isLoadingAccounts, data: dataAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <Container
      titleHeader="Contas de Banco"
      rightContentHeader={
        <Button
          onClick={() => setShowAccountModal(true)}
          className="flex items-center gap-2 bg-purple-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-white ml-auto"
        >
          <span className="hidden sm:inline">Nova Conta</span>
        </Button>
      }
    >
      <List
        columns={[
          {
            label: "Nome",
          },
          {
            label: "Tipo",
          },
          {
            label: "Saldo / Limite",
          },

          {
            label: "",
          },
          {
            label: "",
          },
        ]}
        data={dataAccounts?.data}
        isLoading={isLoadingAccounts}
        render={(item) => <AccountItem item={item} />}
        renderEmpty={() => (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div>
              <img src="/ui/piggy-bank.png" className="w-36 opacity-80" />
            </div>
            <div className="text-gray-900 dark:text-gray-400 text-center">
              <div className="font-bold">Nada para mostrar</div>
              <div className="text-gray-500">
                Você ainda não cadastrou nenhuma conta
              </div>
            </div>
          </div>
        )}
      />

      {showAccountModal && (
        <AccountModal isOpen onClose={() => setShowAccountModal(false)} />
      )}
    </Container>
  );
};
