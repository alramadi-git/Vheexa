import { tPaginationModel } from "@/models/pagination";

type tSuccessService<tData> = {
  isSuccess: true;
  data: tData;
};
type tPaginatedService<tData> = {
  isSuccess: true;
  data: tData[];
  pagination: tPaginationModel;
};

export type { tSuccessService, tPaginatedService };
