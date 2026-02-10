"use client";

import { ePageSize } from "@/validators/pagination";

import { useTranslations } from "next-intl";
import { useQuery } from "@/hooks/query";

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

import { tOption } from "./selects";
import { tPaginationModel } from "@/models/pagination";

import { ClsPagination } from "@/classes/pagination";

type tPaginationProps = {
  pagination: tPaginationModel;
};

export function Pagination(props: tPaginationProps) {
  const searchParams = useQuery();
  const tPagination = useTranslations("components.pagination");

  const options: tOption[] = tPagination.raw("page-size.options");
  const pagination = new ClsPagination(props.pagination);

  function setPagination(pagination: ClsPagination) {
    if (pagination.isFirst()) searchParams.remove("pagination.page");
    else searchParams.set("pagination.page", pagination.page.toString());

    if (pagination.pageSize === ePageSize.ten)
      searchParams.remove("pagination.page-size");
    else
      searchParams.set("pagination.page-size", pagination.pageSize.toString());

    searchParams.apply();
  }

  return (
    <ShadcnPagination className="gap-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            variant="outline"
            aria-disabled={pagination.isFirst() ? true : undefined}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => setPagination(pagination.firstPage())}
          >
            <LuChevronFirst />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton
            aria-disabled={pagination.isFirst() ? true : undefined}
            variant="outline"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => setPagination(pagination.previousPage())}
          >
            <LuChevronLeft />
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            aria-disabled={pagination.isLast() ? true : undefined}
            variant="outline"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => setPagination(pagination.nextPage())}
          >
            <LuChevronRight />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton
            aria-disabled={pagination.isLast() ? true : undefined}
            variant="outline"
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => setPagination(pagination.lastPage())}
          >
            <LuChevronLast />
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

export { ClsPagination };
