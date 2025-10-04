import "reflect-metadata";

import { Expose } from "class-transformer";

interface IResponse {}

interface ISuccess extends IResponse {}

class SuccessOne<TData> implements ISuccess {
  public readonly Data: TData;

  constructor(data: TData) {
    this.Data = data;
  }
}

class SuccessMany<TData> implements ISuccess {
  public readonly Data: Array<TData>;
  public readonly Pagination: Pagination;

  constructor(data: Array<TData>, pagination: Pagination) {
    this.Data = data;
    this.Pagination = pagination;
  }
}

enum ERROR_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  SERVER_ERROR = 500,
}
class Error implements IResponse {
  public readonly Code: ERROR_CODE;
  public readonly Message: string;

  constructor(code: ERROR_CODE, message: string) {
    this.Code = code;
    this.Message = message;
  }
}

class Pagination {
  @Expose() public readonly Page: number;
  @Expose() public readonly PageSize: number;
  @Expose() public readonly TotalItems: number;

  @Expose() public readonly TotalPages: number;

  constructor(page: number, pageSize: number, totalItems: number) {
    this.Page = page;
    this.PageSize = pageSize;
    this.TotalItems = totalItems;

    this.TotalPages = Math.ceil(this.TotalItems / this.PageSize);
  }

  public Next(): number {
    let next = this.Page;

    if (this.Page !== this.TotalPages) next++;
    return next;
  }

  public Prev(): number {
    let prev = this.Page;

    if (this.Page !== 1) prev--;
    return prev;
  }
}

export type { IResponse, ISuccess };
export { SuccessOne, SuccessMany, ERROR_CODE, Error, Pagination };
