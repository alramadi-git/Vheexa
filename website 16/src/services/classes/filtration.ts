enum PAGE_SIZE {
  _5 = 5,
  _10 = 10,
  _20 = 20,
  _50 = 50,
}

class PaginationQuery {
  public readonly Page: number;
  public readonly PageSize: PAGE_SIZE;

  constructor(page: number);
  constructor(page: number, pageSize: PAGE_SIZE);
  public constructor(page: number, pageSize: PAGE_SIZE = PAGE_SIZE._5) {
    this.Page = page;
    this.PageSize = pageSize;
  }
}

abstract class Filtration {
  public readonly Pagination: PaginationQuery;

  public constructor(pagination: PaginationQuery) {
    this.Pagination = pagination;
  }
}

export { PAGE_SIZE };
export { Filtration, PaginationQuery };
