import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Summary } from "./components/Summary";
import { LastTransactions } from "./components/LastTransactions";
import { DistributionExpenses } from "./components/DistributionExpenses";

export const Home = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <Container
      titleHeader="Visão geral"
      rightContentHeader={
        <Button onClick={() => setShowTransactionModal(true)}>
          <Plus className="w-4 h-4" />
          Nova Entrada
        </Button>
      }
      hideGoBack
    >
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        <Summary />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <LastTransactions />
          <DistributionExpenses />
        </div>
      </div>
    </Container>
  );
};
