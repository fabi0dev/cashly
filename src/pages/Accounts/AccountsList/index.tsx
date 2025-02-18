import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { AccountModal } from "@/shared/Modals/AccountModal";
import { queries } from "@/queries";

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
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white backdrop-blur-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-600">
                    Nome
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAccounts?.data.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="p-4 text-gray-600">{account.name}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {formatCurrency(account.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showTransactionModal && (
        <AccountModal isOpen onClose={() => setShowTransactionModal(false)} />
      )}
    </Container>
  );
};
