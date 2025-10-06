"use client";

import { Pagination } from "@/classes/api";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

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

type TPaginationFilterProps = {
  pagination: Pagination;
};

const pageSizes = [5, 10, 20, 50];

export default function PaginationFilter({
  pagination,
}: TPaginationFilterProps) {
  return (
    <div className="flex items-center justify-start gap-3">
      <Select defaultValue="10" aria-label="Results per page">
        <SelectTrigger
          id="results-per-page"
          className="w-fit whitespace-nowrap"
        >
          <SelectValue placeholder="Select number of results" />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={pageSize.toString()}
              disabled={pageSize === pagination.PageSize}
            >
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ShadcnPagination>
        <PaginationContent>
          {/* First page button */}
          <PaginationItem>
            <PaginationButton
              variant="outline"
              aria-label="Go to first page"
              aria-disabled={pagination.IsFirst() ? true : undefined}
              role={pagination.IsFirst() ? "link" : undefined}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <ChevronFirstIcon size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Previous page button */}
          <PaginationItem>
            <PaginationButton
              variant="outline"
              aria-label="Go to previous page"
              aria-disabled={pagination.IsFirst() ? true : undefined}
              role={pagination.IsFirst() ? "link" : undefined}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <ChevronLeftIcon size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Left ellipsis (...) */}
          {/* {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )} */}

          {/* Page number links */}
          {/* {pagination.Pages().map((page) => (
          <PaginationItem key={page}>
            <PaginationButton
              variant="outline"
              isActive={page === pagination.Page}
            >
              {page}
            </PaginationButton>
          </PaginationItem>
        ))} */}

          {/* Right ellipsis (...) */}
          {/* {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )} */}

          {/* Next page button */}
          <PaginationItem>
            <PaginationButton
              variant="outline"
              aria-label="Go to next page"
              aria-disabled={pagination.IsLast() ? true : undefined}
              role={pagination.IsLast() ? "link" : undefined}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <ChevronRightIcon size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>

          {/* Last page button */}
          <PaginationItem>
            <PaginationButton
              variant="outline"
              aria-label="Go to last page"
              aria-disabled={pagination.IsLast() ? true : undefined}
              role={pagination.IsLast() ? "link" : undefined}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <ChevronLastIcon size={16} aria-hidden="true" />
            </PaginationButton>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>

      <p
        className="text-muted-foreground ms-auto text-sm whitespace-nowrap"
        aria-live="polite"
      >
        Page <span className="text-foreground">{pagination.Page}</span> of{" "}
        <span className="text-foreground">{pagination.TotalPages}</span>
      </p>
    </div>
  );
}
