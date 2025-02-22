import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import { useEffect } from "react";
import { ListPaginationManager } from "./components/ListPaginationManager";

export type ResponsePagination = {
  totalItems: number;
  totalPages: number;
};

interface Column {
  label: string;
  className?: string;
}

interface ListProps<T> {
  data?: T[];
  render: (item: T) => React.ReactNode;
  isLoading: boolean;
  columns: Column[];
  href?: (item: T) => string;
  rowClick?: (item: T) => void;
  renderEmpty?: () => React.ReactNode;
  pagination?: ResponsePagination;
}

export const List = <T,>({
  data = [],
  render,
  isLoading,
  columns,
  href,
  rowClick,
  renderEmpty,
  pagination,
}: ListProps<T>) => {
  const { currentPage, setPage } = usePagination();

  useEffect(() => {
    if (pagination) {
      if (pagination.totalPages < currentPage) {
        setPage(pagination.totalPages || 1);
      } else if (pagination.totalPages === 0) {
        setPage(1);
      }
    }
  }, []);

  return (
    <div className=" bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl overflow-hidden px-4 py-2">
      {(isLoading || data.length > 0) && (
        <div className="grid grid-cols-1 divide-y">
          <List.Row>
            {columns.map((column, index) => (
              <List.Td
                key={index}
                className={cn(
                  "font-semibold text-gray-800 dark:text-gray-200",
                  column.className
                )}
              >
                {column.label}
              </List.Td>
            ))}
          </List.Row>

          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <List.Row key={index} className={"border-transparent"}>
                  <Skeleton className="h-10 w-full my-2" />
                </List.Row>
              ))
            : data.map((item, index) => (
                <List.Row
                  key={index}
                  href={href ? href(item) : undefined}
                  onClick={() => rowClick && rowClick(item)}
                >
                  {render(item)}
                </List.Row>
              ))}
        </div>
      )}

      {renderEmpty && !data.length && !isLoading && (
        <List.Row>{renderEmpty()}</List.Row>
      )}

      {pagination && pagination?.totalPages > 0 && (
        <ListPaginationManager pagination={pagination} />
      )}

      {!pagination && data.length > 1 && (
        <div className="text-sm text-gray-500 text-center pt-5">
          Mostrando {data.length} itens
        </div>
      )}
    </div>
  );
};

List.Row = ({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return href ? (
    <Link to={href}>
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(150px,5fr))]",
          " border-gray-100 dark:border-gray-600 last:border-0 cursor-pointer hover:opacity-70",
          onClick && "cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(150px,5fr))] border-gray-100 dark:border-gray-600  last:border-0",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

List.Td = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center p-3 text-gray-600 dark:text-gray-300",
      className
    )}
  >
    {children}
  </div>
);
