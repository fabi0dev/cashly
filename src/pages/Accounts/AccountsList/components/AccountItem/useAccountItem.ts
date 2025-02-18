import { toastError, toastSuccess } from "@/lib/toast";
import { queries } from "@/queries";
import { DeleteAccount } from "@/services/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseAccountItemProps {
  setShowConfirmDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useAccountItem = ({
  setShowConfirmDeleteAccount,
}: UseAccountItemProps) => {
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
        setShowConfirmDeleteAccount(false);
      },
      onError: () => toastError("Erro ao excluir conta"),
    });

  return {
    mutateDeleteAccount,
    isLoadingDeleteAccount,
  };
};
