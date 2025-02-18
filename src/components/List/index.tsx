import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
}

export const List = <T,>({
  data,
  render,
  isLoading,
  columns,
  href,
}: ListProps<T>) => {
  return (
    <div className="bg-white backdrop-blur-xl rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 divide-y divide-gray-200">
        <List.Row>
          {columns.map((column, index) => (
            <List.Td
              key={index}
              className={column.className || "font-semibold text-gray-800"}
            >
              {column.label}
            </List.Td>
          ))}
        </List.Row>

        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <List.Row key={index}>
                <Skeleton className="h-6 w-full" />
              </List.Row>
            ))
          : data?.map((item, index) => (
              <List.Row key={index} href={href ? href(item) : undefined}>
                {render(item)}
              </List.Row>
            ))}
      </div>
    </div>
  );
};

List.Row = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => {
  return href ? (
    <Link to={href}>
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]",
          " p-4 border-b border-gray-100 last:border-0 cursor-pointer hover:opacity-70"
        )}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] p-4 border-b border-gray-100 last:border-0">
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
}) => <div className={cn("p-2 text-gray-500", className)}>{children}</div>;
