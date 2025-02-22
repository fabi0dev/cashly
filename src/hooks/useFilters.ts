import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const removeFilter = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return { searchParams, setFilter, removeFilter };
};
