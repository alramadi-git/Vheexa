import { ePageSize } from "@/enums/page-size";
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

  firstPage(): ClsPagination {
    return new ClsPagination({
      page: 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }
  lastPage(): ClsPagination {
    return new ClsPagination({
      page: this.totalPages,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }

  previousPage(): ClsPagination {
    if (this.isFirst()) return this;

    return new ClsPagination({
      page: this.page - 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }
  nextPage(): ClsPagination {
    if (this.isLast()) return this;

    return new ClsPagination({
      page: this.page + 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }

  public selectPageSize(pageSize: ePageSize): ClsPagination {
    return new ClsPagination({
      page: this.page,
      pageSize: pageSize,
      totalItems: this.totalItems,
    });
  }
}

export { ClsPagination };
