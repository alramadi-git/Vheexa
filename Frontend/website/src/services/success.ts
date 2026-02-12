import { tSuccessModel, tPaginatedModel } from "@/models/success";

type tSuccessService<tData> = tSuccessModel<tData> & {
  isSuccess: true;
};
type tPaginatedSuccessService<tData> = tPaginatedModel<tData> & {
  isSuccess: true;
};

export type { tSuccessService, tPaginatedSuccessService };
