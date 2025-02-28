import { cn } from "@/lib/utils";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  rightContent?: React.ReactNode;
  hideGoBack?: boolean;
}

export const Header = ({
  title,
  isSidebarOpen,
  toggleSidebar,
  rightContent,
  hideGoBack,
}: HeaderProps) => {
  return (
    <header className={cn("flex-row mx-auto max-w-[1024px] p-5 py-4")}>
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

        <div className="flex flex-row items-center">
          {!hideGoBack && (
            <Link
              to="javascript:history.back(-1)"
              className="mr-4 hover:bg-gray-400/50 p-2 rounded-lg transform"
            >
              <ArrowLeft />
            </Link>
          )}

          <span className="font-semibold text-2xl">{title}</span>
        </div>

        {rightContent}
      </div>
    </header>
  );
};
