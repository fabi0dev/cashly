import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  title?: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  rightContent?: React.ReactNode;
}

export const Header = ({
  title,
  isSidebarOpen,
  toggleSidebar,
  rightContent,
}: HeaderProps) => {
  return (
    <header className={cn("backdrop-blur-xl flex-row mx-auto max-w-[1024px]")}>
      <div className="h-16 flex items-center justify-between">
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

        <span className="font-semibold text-2xl">{title}</span>

        {rightContent}
      </div>
    </header>
  );
};
