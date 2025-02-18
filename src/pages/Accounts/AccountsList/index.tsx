import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
          <Plus className="w-4 h-4" />
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
            label: "Saldo",
          },
          {
            label: "",
            className: "w-[30px]",
          },
        ]}
        data={dataAccounts?.data}
        isLoading={isLoadingAccounts}
        render={(item) => <AccountItem item={item} />}
      />

      {showAccountModal && (
        <AccountModal isOpen onClose={() => setShowAccountModal(false)} />
      )}
    </Container>
  );
};
