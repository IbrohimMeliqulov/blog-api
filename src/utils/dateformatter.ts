import { DateTime } from "luxon";

export const formatTashkent = (date: Date) =>
  DateTime.fromJSDate(date, { zone: "utc" }).setZone("Asia/Tashkent").toISO();
