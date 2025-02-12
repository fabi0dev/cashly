import { Container } from "@/components/Container";
import { TransactionModal } from "@/shared/Modals/TransactionModal";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export const transactions = [
  {
    id: 1,
    type: "expense",
    description: "Supermercado",
    amount: 350,
    date: "2024-03-15",
    category: "Alimentação",
  },
  {
    id: 2,
    type: "income",
    description: "Salário",
    amount: 3000,
    date: "2024-03-10",
    category: "Salário",
  },
  {
    id: 3,
    type: "expense",
    description: "Netflix",
    amount: 39.9,
    date: "2024-03-05",
    category: "Lazer",
  },
  {
    id: 4,
    type: "expense",
    description: "Uber",
    amount: 25.5,
    date: "2024-03-03",
    category: "Transporte",
  },
  {
    id: 5,
    type: "expense",
    description: "Farmácia",
    amount: 89.9,
    date: "2024-03-02",
    category: "Saúde",
  },
  {
    id: 6,
    type: "income",
    description: "Freelance",
    amount: 800,
    date: "2024-03-01",
    category: "Outros",
  },
];

export const Transactions = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const totalIncome = transactions.reduce(
    (acc, curr) => acc + (curr.type === "income" ? curr.amount : 0),
    0
  );
  const totalExpenses = transactions.reduce(
    (acc, curr) => acc + (curr.type === "expense" ? curr.amount : 0),
    0
  );

  return (
    <Container
      titleHeader="Relatório de Transações"
      rightContentHeader={
        <Button
          onClick={() => setShowTransactionModal(true)}
          className="flex items-center gap-2 bg-purple-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-white ml-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Total Receitas</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              R$ {totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="font-medium">Total Despesas</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              R$ {totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="bg-white backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Receipt className="w-4 h-4" />
              <span className="font-medium">Total Transações</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{transactions.length}</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white backdrop-blur-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-600">
                    Data
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Descrição
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Categoria
                  </th>
                  <th className="text-right p-4 font-medium text-gray-600">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="p-4 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-right font-medium ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      R$ {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />
    </Container>
  );
};
