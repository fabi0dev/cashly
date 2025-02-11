import { Container } from "@/components/Container";
import { transactions } from "../Transactions";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export const categories = [
  { id: 1, name: "Alimentação", icon: "🍽️", budget: 800 },
  { id: 2, name: "Transporte", icon: "🚗", budget: 400 },
  { id: 3, name: "Moradia", icon: "🏠", budget: 2000 },
  { id: 4, name: "Saúde", icon: "⚕️", budget: 500 },
  { id: 5, name: "Educação", icon: "📚", budget: 300 },
  { id: 6, name: "Lazer", icon: "🎮", budget: 200 },
  { id: 7, name: "Salário", icon: "💰", budget: 0 },
  {
    id: 8,
    name: "Investimentos",
    color: "bg-cyan-500",
    icon: "📈",
    budget: 1000,
  },
  { id: 9, name: "Outros", color: "bg-gray-500", icon: "📦", budget: 200 },
];

export const Categories = () => {
  const getCategoryTotal = (categoryName: string) => {
    return transactions
      .filter((t) => t.category === categoryName)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Categorias</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category) => {
            const total = getCategoryTotal(category.name);
            const percentage =
              category.budget > 0 ? (total / category.budget) * 100 : 0;

            return (
              <div
                key={category.id}
                className={cn(
                  "group relative bg-white border border-gray-200",
                  "rounded-xl overflow-hidden transition-all duration-300"
                )}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", category.color)}>
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {category.name}
                      </h3>
                    </div>
                    <Receipt className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Gasto no Mês</span>
                        <span className="font-medium text-gray-900">
                          R$ {total.toLocaleString()}
                        </span>
                      </div>
                      {category.budget > 0 && (
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-300",
                              category.color
                            )}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {category.budget > 0 && (
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                        <span className="text-gray-500">Orçamento</span>
                        <span className="font-medium text-gray-900">
                          R$ {category.budget.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
