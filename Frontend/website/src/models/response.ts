import { tSuccessOneModel, tSuccessManyModel } from "./success";

type tResponseOneModel<tData> = tSuccessOneModel<tData> | string;
type tResponseManyModel<tData> = tSuccessManyModel<tData> | string;

export type { tResponseOneModel, tResponseManyModel };
