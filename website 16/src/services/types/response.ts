import { tPagination } from "./pagination";

type tSuccessOne<tData> = {
  data: tData;
};
type tSuccessMany<tData> = {
  data: Array<tData>;
  pagination: tPagination;
};

enum eERROR_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

type tError = {
  code: eERROR_CODE;
  message: string;
};

type tResponseOne<tData> = tSuccessOne<tData> | tError;
type tResponseMany<tData> = tSuccessMany<tData> | tError;

export { eERROR_CODE };
export type { tSuccessOne, tSuccessMany, tError, tResponseOne, tResponseMany };
