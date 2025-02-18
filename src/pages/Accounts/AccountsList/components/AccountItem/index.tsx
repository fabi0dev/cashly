import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/services/account";
import { AccountModal } from "@/shared/Modals/AccountModal";
import { CheckCircle, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useAccountItem } from "./useAccountItem";
import { getAccountTypeLabel } from "@/constants/AccountsTypes";

interface AccountItemProps {
  item: Account;
}

export const AccountItem = ({ item }: AccountItemProps) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showConfirmDeleteAccount, setShowConfirmDeleteAccount] =
    useState(false);

  const { mutateDeleteAccount, isLoadingDeleteAccount } = useAccountItem({
    setShowConfirmDeleteAccount,
  });

  return (
    <>
      <List.Row onClick={() => setShowAccountModal(true)}>
        <List.Td>{item.name}</List.Td>
        <List.Td>{formatCurrency(item.balance)}</List.Td>
        <List.Td>{getAccountTypeLabel(item.type)}</List.Td>
        <List.Td>
          {item.isDefault && <CheckCircle className="text-emerald-800" />}
        </List.Td>
        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Editar",
                onClick: () => setShowAccountModal(true),
              },
              {
                label: "Excluir",
                onClick: () => setShowConfirmDeleteAccount(true),
              },
            ]}
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            }
          />
        </List.Td>
      </List.Row>

      {showAccountModal && (
        <AccountModal
          accountId={item.id}
          isOpen
          onClose={() => setShowAccountModal(false)}
        />
      )}

      {showConfirmDeleteAccount && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteAccount}
          onOpenChange={() => setShowConfirmDeleteAccount(false)}
          title={"Excluir Conta"}
          description={
            <div>
              {`Tem certeza que deseja excluir`} <b>{item.name}</b>{" "}
              {`das conta?`}
            </div>
          }
          onConfirm={() => mutateDeleteAccount(item.id)}
          onCancel={() => setShowConfirmDeleteAccount(false)}
        />
      )}
    </>
  );
};
