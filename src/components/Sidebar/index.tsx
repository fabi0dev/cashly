import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  CreditCard,
  Goal,
  LogOut,
  Settings,
  Wallet2,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`
    fixed lg:static inset-y-0 left-0 z-30
    w-64 bg-white/70 backdrop-blur-xl
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    flex flex-col
  `}
    >
      {/* Logo Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <Wallet2 className="w-6 h-6 text-gray-900" />
          <h1 className="text-xl font-medium text-gray-900">
            Cash<span className="font-bold">ly</span>
          </h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-900 font-medium">JS</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">João Silva</h3>
            <p className="text-sm text-gray-500">Conta Pessoal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-white rounded-lg ",
                "bg-emerald-500 hover:bg-emerald-600 transition-colors"
              )}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Cartões</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Goal className="w-5 h-5" />
              <span className="font-medium">Objetivos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notificações</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3">
        <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
