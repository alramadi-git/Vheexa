import { tPaginatedModel } from "@/models/success";

type tSuccessService<tData> = {
  isSuccess: true;
  data: tData;
};
type tPaginatedService<tData> = tPaginatedModel<tData> & {
  isSuccess: true;
};

export type { tSuccessService, tPaginatedService };
