import { tFailedModel } from "@/models/failed";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

type tResponseOneModel<tData> = tFailedModel | tSuccessOneModel<tData>;
type tResponseManyModel<tData> = tFailedModel | tSuccessManyModel<tData>;

export type { tResponseOneModel, tResponseManyModel };
