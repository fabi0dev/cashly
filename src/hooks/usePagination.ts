import { SystemConfig } from "@/constants/SystemConfig";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit =
    Number(searchParams.get("limit")) || SystemConfig.list.defaultLimit;

  const setPage = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const setLimit = (page: number) => {
    searchParams.set("limit", String(page));
    setSearchParams(searchParams);
  };

  return { currentPage, setPage, limit, setLimit };
};
