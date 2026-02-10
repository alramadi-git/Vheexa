import { tPaginationModel } from "./pagination";

type tSuccessModel<tData> = {
  data: tData;
};

type tPaginatedSuccessModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

export type { tSuccessModel, tPaginatedSuccessModel };
