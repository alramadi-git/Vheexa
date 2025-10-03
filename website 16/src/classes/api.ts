interface IResponse {}

abstract class Success implements IResponse {}

class SuccessOne<TData> extends Success {
  public Data: TData;

  constructor(data: TData) {
    super();
    this.Data = data;
  }
}

class SuccessMany<TData> extends Success {
  public Data: Array<TData>;
  public Pagination: Pagination;

  constructor(data: Array<TData>, pagination: Pagination) {
    super();

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
  public Code: ERROR_CODE;
  public Message: string;

  constructor(code: ERROR_CODE, message: string) {
    this.Code = code;
    this.Message = message;
  }
}

class Pagination {
  public readonly Page: number;
  public readonly PageSize: number;
  public readonly TotalItems: number;

  public readonly TotalPages: number;

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

export type { IResponse };
export { Success, SuccessOne, SuccessMany, ERROR_CODE, Error, Pagination };
