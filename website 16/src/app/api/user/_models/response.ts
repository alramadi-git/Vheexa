import { tPaginationModel } from "./pagination";

type tSuccessOneModel<tData> = {
  data: tData;
};
type tSuccessManyModel<tData> = {
  data: Array<tData>;
  pagination: tPaginationModel;
};

enum eERROR_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

type tErrorModel = {
  code: eERROR_CODE;
  message: string;
};

type tResponseOneModel<tData> = tSuccessOneModel<tData> | tErrorModel;
type tResponseManyModel<tData> = tSuccessManyModel<tData> | tErrorModel;

export { eERROR_CODE };
export type {
  tSuccessOneModel,
  tSuccessManyModel,
  tErrorModel,
  tResponseOneModel,
  tResponseManyModel,
};
