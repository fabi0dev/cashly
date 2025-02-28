import { useSearchParams } from "react-router-dom";
import { AnyObject, ObjectSchema } from "yup";

interface UseFiltersParams<T extends AnyObject> {
  schema: ObjectSchema<T>;
}

export const useFilters = <SchemaFilters extends Record<string, string>>({
  schema,
}: UseFiltersParams<SchemaFilters>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const allQueryParams = Object.fromEntries(searchParams.entries());

  const filteredParams: Partial<SchemaFilters> = Object.keys(
    schema.fields
  ).reduce((acc, key) => {
    if (allQueryParams[key]) {
      acc[key as keyof SchemaFilters] = allQueryParams[
        key
      ] as SchemaFilters[keyof SchemaFilters];
    }
    return acc;
  }, {} as Partial<SchemaFilters>);

  const setFilter = (key: keyof SchemaFilters, value: string) => {
    searchParams.set(key as string, value);
    setSearchParams(searchParams);
  };

  const removeFilter = (key: keyof SchemaFilters) => {
    searchParams.delete(key as string);
    setSearchParams(searchParams);
  };

  const setFilters = (filters: SchemaFilters) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key as string);
      }
    });
    setSearchParams(searchParams);
  };

  const removeAllFilters = () => {
    Object.keys(filteredParams).forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);
  };

  return {
    setFilter,
    removeFilter,
    setFilters,
    filteredParams,
    removeAllFilters,
  };
};
