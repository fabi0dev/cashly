import { DateTime } from "luxon";

export const formatToDateString = (dateString: string) =>
  DateTime.fromISO(dateString).toFormat("dd/MM/yyyy");

export const formatToDateRelative = (dateString: string) =>
  DateTime.fromISO(dateString).toRelative();

export const formatDateLabel = (dateStr: string): string => {
  const date = DateTime.fromISO(dateStr).setLocale("pt-BR");
  const today = DateTime.now().setLocale("pt-BR");

  if (date.hasSame(today, "day")) return "Hoje";
  if (date.hasSame(today.minus({ days: 1 }), "day")) return "Ontem";

  return date.year === today.year
    ? date.toFormat("dd 'de' LLLL")
    : date.toFormat("DDD");
};
