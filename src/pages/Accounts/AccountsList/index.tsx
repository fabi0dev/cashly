import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { AccountModal } from "@/shared/Modals/AccountModal";
import { queries } from "@/queries";
import { List } from "@/components/List";

export const AccountsList = () => {
  const { isLoading: isLoadingAccounts, data: dataAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <Container
      titleHeader="Contas de Banco"
      rightContentHeader={
        <Button
          onClick={() => setShowTransactionModal(true)}
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
        ]}
        data={dataAccounts?.data}
        isLoading={isLoadingAccounts}
        href={(item) => `/accounts/${item.id}`}
        render={(item) => (
          <>
            <List.Td>{item.name}</List.Td>
            <List.Td>{formatCurrency(item.balance)}</List.Td>
          </>
        )}
      />

      {showTransactionModal && (
        <AccountModal isOpen onClose={() => setShowTransactionModal(false)} />
      )}
    </Container>
  );
};
