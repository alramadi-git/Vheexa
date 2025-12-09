"use client";

import { ePageSize } from "@/validations/pagination";
import { tPaginationModel } from "@/models/pagination";

import { useTranslations } from "next-intl";
import { useQuery } from "@/hooks/use-query";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

type tOption = {
  value: ePageSize;
  label: string;
};

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

  public selectPageSize(pageSize: ePageSize): clsPagination {
    return new clsPagination({
      page: this.page,
      pageSize: pageSize,
      totalItems: this.totalItems,
    });
  }
}

type tPaginationProps = {
  pagination: tPaginationModel;
};

export function Pagination(props: tPaginationProps) {
  const searchParams = useQuery();
  const tPagination = useTranslations("components.pagination");

  const options: tOption[] = tPagination.raw("page-size.options");

  const pagination = new clsPagination(props.pagination);

  function setPagination(pagination: clsPagination) {
    searchParams.set("pagination.page", pagination.page.toString());
    searchParams.set("pagination.page-size", pagination.pageSize.toString());
    searchParams.apply();
  }

  return (
    <ShadcnPagination className="gap-3">
      <PaginationContent>
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

      <Select
        value={pagination.pageSize.toString()}
        onValueChange={(value) =>
          setPagination(pagination.selectPageSize(Number(value)))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={tPagination("page-size.label")} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              className="capitalize"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
    </ShadcnPagination>
  );
}
