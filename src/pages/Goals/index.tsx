import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { GoalModal } from "@/shared/Modals/GoalModal";
import { Plus } from "lucide-react";
import { useState } from "react";

const goals = [
  {
    id: 1,
    name: "Fundo de Emergência",
    targetAmount: 10000,
    currentAmount: 3000,
    deadline: "2025-12-31",
    icon: "🎯",
  },
  {
    id: 2,
    name: "Viagem",
    targetAmount: 5000,
    currentAmount: 1920,
    deadline: "2025-08-31",
    icon: "✈️",
  },
];

export const Goals = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Container
      titleHeader="Objetivos"
      rightContentHeader={
        <Button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center gap-2 bg-purple-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-white ml-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Novo Objetivo</span>
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = calculateDaysLeft(goal.deadline);

            return (
              <div
                key={goal.id}
                className="group relative bg-white backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div
                  className={`absolute inset-0  opacity-10 group-hover:opacity-20 transition-opacity`}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <div className={`p-2 rounded-lg  bg-opacity-10`}>
                        <span className="text-xl">{goal.icon}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Progresso</span>
                        <span className="font-medium text-gray-900">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 bg-purple-700`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Valor Atual</p>
                        <p className="font-medium text-gray-900">
                          R$ {goal.currentAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Meta</p>
                        <p className="font-medium text-gray-900">
                          R$ {goal.targetAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {daysLeft > 0
                          ? `${daysLeft} dias restantes`
                          : "Meta vencida"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Vence em{" "}
                        {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showGoalModal && (
        <GoalModal
          isOpen
          onClose={() => setShowGoalModal(false)}
          onSubmit={() => setShowGoalModal(false)}
        />
      )}
    </Container>
  );
};
