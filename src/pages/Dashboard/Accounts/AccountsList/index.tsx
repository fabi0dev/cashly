import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AccountModal } from "@/shared/Modals/AccountModal";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { AccountItem } from "./components/AccountItem";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

export const AccountsList = () => {
  const { isLoading: isLoadingAccounts, data: dataAccounts } = useQuery({
    ...queries.account.getAll(),
  });

  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <Container
      titleHeader="Contas de Banco"
      rightContentHeader={
        <Button onClick={() => setShowAccountModal(true)}>Nova Conta</Button>
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
          <EmptyPlaceholder
            title="Nenhuma conta"
            description="Você precisa de pelo menos uma conta para começar"
          />
        )}
      />

      {showAccountModal && (
        <AccountModal isOpen onClose={() => setShowAccountModal(false)} />
      )}
    </Container>
  );
};
