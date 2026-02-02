import { tSuccessModel, tPaginatedSuccessModel } from "@/models/success";

type tSuccessService<tData> = tSuccessModel<tData> & {
  isSuccess: true;
};
type tPaginatedSuccessService<tData> = tPaginatedSuccessModel<tData> & {
  isSuccess: true;
};

export type { tSuccessService, tPaginatedSuccessService };
