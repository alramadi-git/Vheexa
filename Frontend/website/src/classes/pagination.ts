import { tPaginationModel } from "@/models/pagination";

class ClsPagination {
  public readonly page: number;
  public readonly pageSize: number;
  public readonly totalItems: number;
  public readonly totalPages: number;

  constructor(pagination: tPaginationModel) {
    this.page = pagination.page;
    this.pageSize = pagination.pageSize;
    this.totalItems = pagination.totalItems;

    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  isFirst(): boolean {
    return this.page <= 1;
  }
  isLast(): boolean {
    return this.page >= this.totalPages;
  }

  firstPage(): number {
    return 1;
  }
  lastPage(): number {
    return this.totalPages;
  }

  previousPage(): number {
    if (this.isFirst()) return this.page;

    return this.page - 1;
  }
  nextPage(): number {
    if (this.isLast()) return this.page;

    return this.page + 1;
  }
}

export { ClsPagination };
