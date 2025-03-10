import { useFilters } from "@/hooks/useFilters";
import { formatDateLabel } from "@/lib/date";
import {
  schemaExpenseFilters,
  SchemaExpenseFilters,
} from "../../../ExpenseFilters/schema";
import { ArrowRight } from "lucide-react";

export const SubtitleSummary = () => {
  const { filteredParams } = useFilters<SchemaExpenseFilters>({
    schema: schemaExpenseFilters,
  });

  return filteredParams.dueDateStart && filteredParams.dueDateEnd ? (
    <div className="flex flex-row text-sm items-center gap-1">
      {formatDateLabel(filteredParams.dueDateStart.toString())}{" "}
      <ArrowRight size={15} />{" "}
      {formatDateLabel(filteredParams.dueDateEnd.toString())}
    </div>
  ) : (
    "Deste mês"
  );
};
