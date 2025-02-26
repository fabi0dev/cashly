import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { SystemConfig } from "@/constants/SystemConfig";
import { usePagination } from "@/hooks/usePagination";
import { ResponsePagination } from "@/services/common";

interface ListPaginationManagerProps {
  pagination: ResponsePagination;
}
export const ListPaginationManager = ({
  pagination,
}: ListPaginationManagerProps) => {
  const { currentPage, setPage, limit, setLimit } = usePagination();

  const handleItemsPerPage = (value: string) => {
    const newLimit = Number(value);
    const newTotalPages = Math.ceil((pagination?.totalItems || 0) / newLimit);
    setLimit(newLimit);
    if (currentPage > newTotalPages) {
      setPage(newTotalPages || 1);
    }
  };

  return (
    <div className="grid grid-cols-[auto_60%] items-center gap-5 mt-4 py-5 text-sm">
      <div></div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center">
          <Button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
            variant={"ghost"}
            title="Ir para página anterior"
          >
            Anterior
          </Button>
          <span>
            {currentPage} / {pagination.totalPages}
          </span>
          <Button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="disabled:opacity-50"
            title="Ir para próxima página"
            variant={"ghost"}
          >
            Próximo
          </Button>
        </div>

        <div className="flex flex-row items-center gap-2 text-gray-400">
          <Select
            className="w-[150px] bg-transparent border-0 hover:bg-input/40"
            value={
              limit.toString() || SystemConfig.list.defaultLimit.toString()
            }
            onValueChange={handleItemsPerPage}
            options={SystemConfig.list.itemsPerPage.map((item) => {
              return {
                label: item.toString() + " por página",
                value: item.toString(),
              };
            })}
          />
          <span className="ml-3">{pagination.totalItems} no total</span>
        </div>
      </div>
    </div>
  );
};
