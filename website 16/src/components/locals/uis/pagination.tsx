import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
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
import { Pagination as ClsPagination } from "@/services/classes/api";

export default function Pagination(props: ClsPagination) {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Page number information */}
      <p
        className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
        aria-live="polite"
      >
        Page <span className="text-foreground">{props.Page}</span> of{" "}
        <span className="text-foreground">{props.TotalPages}</span>
      </p>

      {/* Pagination */}
      <div className="grow">
        <ShadcnPagination>
          <PaginationContent>
            {/* Previous page button */}
            <PaginationItem>
              <PaginationButton
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={props.Page === 1 ? undefined : `#/page/${props.Page - 1}`}
                aria-label="Go to previous page"
                aria-disabled={props.Page === 1 ? true : undefined}
                role={props.Page === 1 ? "link" : undefined}
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
            {/* {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`#/page/${page}`}
                  isActive={page === props.Page}
                >
                  {page}
                </PaginationLink>
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
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={
                  props.Page === props.TotalPages
                    ? undefined
                    : `#/page/${props.Page + 1}`
                }
                aria-label="Go to next page"
                aria-disabled={
                  props.Page === props.TotalPages ? true : undefined
                }
                role={props.Page === props.TotalPages ? "link" : undefined}
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </PaginationButton>
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      </div>

      {/* Results per page */}
      <div className="flex flex-1 justify-end">
        <Select defaultValue="10" aria-label="Results per page">
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="20">20 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
            <SelectItem value="100">100 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
