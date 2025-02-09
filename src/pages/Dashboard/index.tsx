import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  DollarSign,
  Calendar,
  X,
  Tag,
  CalendarIcon,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Container } from "@/components/Container";
import { formatToDateRelative } from "@/lib/date";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTransactionModal = () => {
    setIsTransactionModalOpen(!isTransactionModalOpen);
    if (!isTransactionModalOpen) {
      setNewTransaction({
        type: "expense",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
      });
    }
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the transaction submission
    console.log("New transaction:", newTransaction);
    toggleTransactionModal();
  };

  const categories = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Saúde",
    "Educação",
    "Lazer",
    "Salário",
    "Investimentos",
    "Outros",
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Transaction Modal */}
      {isTransactionModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Nova Transação
                </h2>
                <button
                  onClick={toggleTransactionModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleTransactionSubmit} className="space-y-4">
                {/* Transaction Type */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setNewTransaction({ ...newTransaction, type: "income" })
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                      newTransaction.type === "income"
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Receita</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewTransaction({ ...newTransaction, type: "expense" })
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                      newTransaction.type === "expense"
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-medium">Despesa</span>
                  </button>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Descrição
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Ex: Compras no supermercado"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Categoria
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <Tag className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Data
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          date: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    />
                    <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Adicionar Transação
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}

        {/* Dashboard Content */}
      </div>
    </div>
  );
}

export default function Test() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-100">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-600">Saldo Total</h3>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
              R$ 2.000,00
            </p>
          </div>

          {/* Income Card */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-600">Receitas</h3>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-green-600">
              R$ 5.000,00
            </p>
          </div>

          {/* Expenses Card */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-50">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-medium text-gray-600">Despesas</h3>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-red-600">
              R$ 3.000,00
            </p>
          </div>
        </div>

        {/* Charts and Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5" />
              <h2 className="font-medium text-gray-900">
                Distribuição de Gastos
              </h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Gráfico de distribuição de gastos
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5" />
              <h2 className="font-medium text-gray-900">Últimas Transações</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  type: "expense",
                  description: "Supermercado",
                  amount: -350,
                  date: "2024-03-15",
                },
                {
                  type: "income",
                  description: "Salário",
                  amount: 3000,
                  date: "2024-03-10",
                },
                {
                  type: "expense",
                  description: "Netflix",
                  amount: -39.9,
                  date: "2024-03-05",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatToDateRelative(transaction.date)}
                    </p>
                  </div>
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type !== "income" && "-"}
                    R$ {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
