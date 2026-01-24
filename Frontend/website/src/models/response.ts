import { tSuccessModel, tPaginationSuccessModel } from "./success";

type tResponseOneModel<tData> = tSuccessModel<tData> | string;
type tResponseManyModel<tData> = tPaginationSuccessModel<tData> | string;

export type { tResponseOneModel, tResponseManyModel };
