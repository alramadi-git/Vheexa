enum PAGE_SIZE {
  _5 = 5,
  _10 = 10,
  _20 = 20,
  _50 = 50,
}

class PaginationQuery {
  public readonly Page: number;
  public readonly PageSize: PAGE_SIZE;

  constructor();
  constructor(page: number);
  constructor(page: number, pageSize: PAGE_SIZE);
  public constructor(page: number = 1, pageSize: PAGE_SIZE = PAGE_SIZE._5) {
    this.Page = page;
    this.PageSize = pageSize;
  }
}

export { PAGE_SIZE };
export { PaginationQuery };
