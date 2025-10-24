import { tPagination } from "@/validations/pagination";

type tFilterModel<tFilters> = {
  filters: tFilters;
  pagination: tPagination;
};

export type { tFilterModel };
