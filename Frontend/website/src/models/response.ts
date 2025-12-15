import { tSuccessOneModel, tSuccessManyModel } from "./success";

type tResponseOneModel<tData> = tSuccessOneModel<tData>;
type tResponseManyModel<tData> = tSuccessManyModel<tData>;

export type { tResponseOneModel, tResponseManyModel };
