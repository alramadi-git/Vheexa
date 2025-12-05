import { tSuccessOneModel, tSuccessManyModel } from "./success";
import { tFailedModel } from "./failed";

type tResponseOneModel<tData> = tSuccessOneModel<tData> | tFailedModel;
type tResponseManyModel<tData> = tSuccessManyModel<tData> | tFailedModel;

export type { tResponseOneModel, tResponseManyModel };
