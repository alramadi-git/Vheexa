"use client";

import { tPaginationModel } from "@/models/pagination";

import { useTranslations } from "next-intl";

import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
} from "@/components/shadcn/pagination";
import { useSearchParams } from "@/hooks/use-search-params";

class clsPagination {
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

  nextPage(): clsPagination {
    return new clsPagination({
      page: this.page + 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }
  previousPage(): clsPagination {
    return new clsPagination({
      page: this.page - 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }

  firstPage(): clsPagination {
    return new clsPagination({
      page: 1,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }
  lastPage(): clsPagination {
    return new clsPagination({
      page: this.totalPages,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
    });
  }
}

type tPaginationProps = {
  pagination: tPaginationModel;
};

export default function Pagination(
  props: tPaginationProps = {
    pagination: { page: 1, pageSize: 10, totalItems: 0 },
  },
) {
  const searchParams = useSearchParams();
  const tPagination = useTranslations("components.pagination");

  const pagination = new clsPagination(props.pagination);
  function setPagination(pagination: clsPagination) {
    searchParams.setMany([
      ["page", pagination.page.toString()],
      ["limit", pagination.pageSize.toString()],
    ]);
    searchParams.apply();
  }

  return (
    <div className="flex items-center justify-start gap-3">
      <ShadcnPagination>
        <PaginationContent>
          {/* First page button */}
          <PaginationItem>
            <PaginationButton
              variant="outline"
              aria-label="Go to first page"
              aria-disabled={pagination.isFirst() ? true : undefined}
              role={pagination.isFirst() ? "link" : undefined}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => {
                setPagination(pagination.firstPage());
              }}
            >
              <LuChevronFirst size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Previous page button */}
          <PaginationItem>
            <PaginationButton
              aria-label="Go to previous page"
              aria-disabled={pagination.isFirst() ? true : undefined}
              role={pagination.isFirst() ? "link" : undefined}
              variant="outline"
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => {
                setPagination(pagination.previousPage());
              }}
            >
              <LuChevronLeft size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Next page button */}
          <PaginationItem>
            <PaginationButton
              aria-label="Go to next page"
              aria-disabled={pagination.isLast() ? true : undefined}
              role={pagination.isLast() ? "link" : undefined}
              variant="outline"
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => {
                setPagination(pagination.nextPage());
              }}
            >
              <LuChevronRight size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Last page button */}
          <PaginationItem>
            <PaginationButton
              aria-label="Go to last page"
              aria-disabled={pagination.isLast() ? true : undefined}
              role={pagination.isLast() ? "link" : undefined}
              variant="outline"
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => {
                setPagination(pagination.lastPage());
              }}
            >
              <LuChevronLast size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>

      <p
        className="text-muted-foreground ms-auto text-sm whitespace-nowrap"
        aria-live="polite"
      >
        {tPagination.rich("page-details", {
          page: () => (
            <span className="text-foreground">{pagination.page}</span>
          ),
          totalPages: () => (
            <span className="text-foreground">{pagination.totalPages}</span>
          ),
        })}
      </p>
    </div>
  );
}
