import { tPaginationModel } from "@/models/pagination";

type tSuccessOneModel<tData> = {
  data: tData;
};
type tSuccessManyModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

export type { tSuccessOneModel, tSuccessManyModel };
