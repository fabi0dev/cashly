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
  const [show2ConfirmDeleteAccount, setShow2ConfirmDeleteAccount] =
    useState(false);

  const { mutateDeleteAccount, isLoadingDeleteAccount } = useAccountItem({
    stateModal: setShow2ConfirmDeleteAccount,
  });

  return (
    <>
      <List.Row onClick={() => setShowAccountModal(true)}>
        <List.Td>{item.name}</List.Td>
        <List.Td>{getAccountTypeLabel(item.type)}</List.Td>
        <List.Td>{formatCurrency(item.balance)}</List.Td>
        <List.Td>
          {item.isDefault && (
            <CheckCircle className="text-emerald-80  dark:text-emerald-600" />
          )}
        </List.Td>
        <List.Td className="flex items-center justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Excluir",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowConfirmDeleteAccount(true);
                },
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
            <div className="text-left">
              <div className="text-center">
                Tem certeza que deseja excluir esta conta?
              </div>

              <div className="mt-4 mb-2">
                Ao excluir <b>{item.name}</b> você está ciente de que:
              </div>
              <div>- Não poderá mais visualizar esta conta.</div>
              <div>- Não poderá mais visualizar transações desta conta.</div>
            </div>
          }
          onConfirm={() => {
            setShowConfirmDeleteAccount(false);
            setShow2ConfirmDeleteAccount(true);
          }}
          onCancel={() => setShowConfirmDeleteAccount(false)}
        />
      )}

      {show2ConfirmDeleteAccount && (
        <ConfirmDialog
          open
          isLoading={isLoadingDeleteAccount}
          onOpenChange={() => setShow2ConfirmDeleteAccount(false)}
          title={"Ei, você está quase excluindo uma conta!"}
          description={
            <div>
              Você está prestes a excluir <b>{item.name}</b>, é isso mesmo que
              deseja fazer?
            </div>
          }
          onConfirm={() => mutateDeleteAccount(item.id)}
          onCancel={() => setShow2ConfirmDeleteAccount(false)}
          confirmText="Sim quero excluir"
        />
      )}
    </>
  );
};
