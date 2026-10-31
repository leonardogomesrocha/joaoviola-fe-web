import { queryOptions } from "@tanstack/react-query";
import type { Locale } from "@/i18n/config";
import { getStudioData } from "./studio-data";

export const studioQuery = (locale: Locale) =>
  queryOptions({ queryKey: ["studio", locale], queryFn: () => getStudioData(locale) });
