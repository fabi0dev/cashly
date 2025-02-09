import { cn } from "@/lib/utils";
import { Menu, Plus, X } from "lucide-react";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <header
      className={cn(
        "bg-white backdrop-blur-xl border-b border-gray-200 flex-row"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <span className="font-semibold text-lg">Visão geral</span>

        <button className="flex items-center gap-2 bg-purple-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-white ml-auto">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Transação</span>
        </button>
      </div>
    </header>
  );
};
