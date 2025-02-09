import { DateTime } from "luxon";

export const formatToDateString = (dateString: string) =>
  DateTime.fromISO(dateString).toFormat("dd/MM/yyyy");

export const formatToDateRelative = (dateString: string) =>
  DateTime.fromISO(dateString).toRelative();
