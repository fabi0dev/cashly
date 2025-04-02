import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { DeleteAccount } from "@/services/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseAccountItemProps {
  stateModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useAccountItem = ({ stateModal }: UseAccountItemProps) => {
  const queryClient = useQueryClient();

  const invalidateAccountList = () =>
    queryClient.invalidateQueries({ queryKey: queries.account.getAll._def });

  const { mutate: mutateDeleteAccount, isPending: isLoadingDeleteAccount } =
    useMutation({
      mutationFn: (accountId: string) => {
        return DeleteAccount(accountId);
      },
      onSuccess: () => {
        toastSuccess("Conta excluída com sucesso!");
        invalidateAccountList();
        stateModal(false);
      },
      onError: () => toastError("Erro ao excluir conta"),
    });

  return {
    mutateDeleteAccount,
    isLoadingDeleteAccount,
  };
};
