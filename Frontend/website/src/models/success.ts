import { tPaginationModel } from "./pagination";

type tPaginatedModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

export type { tPaginatedModel  };
