// "use client";

// import { tPaginationModel } from "@/app/api/user/_models/pagination";

// import {
//   LuChevronFirst,
//   LuChevronLast,
//   LuChevronLeft,
//   LuChevronRight,
// } from "react-icons/lu";

// import {
//   Pagination as ShadcnPagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationButton,
// } from "@/components/shadcn/pagination";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/shadcn/select";
// class Pagination {
//   page: number;
//   pageSize: number;
//   totalItems: number;

//   constructor(page: number, pageSize: number, totalItems: number) {
//     this.page = page;
//     this.pageSize = pageSize;
//     this.totalItems = totalItems;
//   }

//   get totalPages() {
//     return Math.ceil(this.totalItems / this.pageSize);
//   }

//   IsFirst() {
//     return this.page === 1;
//   }
//   IsLast() {
//     return this.page === this.totalPages;
//   }



// }
// type TPaginationFilterProps = {
//   pagination: tPaginationModel;
// };

// const pageSizes = [5, 10, 20, 50];

// export default function PaginationFilter({
//   pagination,
// }: TPaginationFilterProps) {
//   return (
//     <div className="flex items-center justify-start gap-3">
//       <Select
//         defaultValue={pageSizes[1].toString()}
//         aria-label="Results per page"
//       >
//         <SelectTrigger
//           id="results-per-page"
//           className="w-fit whitespace-nowrap"
//         >
//           <SelectValue placeholder="Select number of results" />
//         </SelectTrigger>
//         <SelectContent>
//           {pageSizes.map((pageSize) => (
//             <SelectItem
//               key={pageSize}
//               value={pageSize.toString()}
//               disabled={pageSize === pagination.PageSize}
//             >
//               {pageSize}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <ShadcnPagination>
//         <PaginationContent>
//           {/* First page button */}
//           <PaginationItem>
//             <PaginationButton
//               variant="outline"
//               aria-label="Go to first page"
//               aria-disabled={pagination.IsFirst() ? true : undefined}
//               role={pagination.IsFirst() ? "link" : undefined}
//               className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//             >
//               <LuChevronFirst size={16} aria-hidden="true" />
//             </PaginationButton>
//           </PaginationItem>

//           {/* Previous page button */}
//           <PaginationItem>
//             <PaginationButton
//               variant="outline"
//               aria-label="Go to previous page"
//               aria-disabled={pagination.IsFirst() ? true : undefined}
//               role={pagination.IsFirst() ? "link" : undefined}
//               className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//             >
//               <LuChevronLeft size={16} aria-hidden="true" />
//             </PaginationButton>
//           </PaginationItem>

//           {/* Left ellipsis (...) */}
//           {/* {showLeftEllipsis && (
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem>
//         )} */}

//           {/* Page number links */}
//           {/* {pagination.Pages().map((page) => (
//           <PaginationItem key={page}>
//             <PaginationButton
//               variant="outline"
//               isActive={page === pagination.Page}
//             >
//               {page}
//             </PaginationButton>
//           </PaginationItem>
//         ))} */}

//           {/* Right ellipsis (...) */}
//           {/* {showRightEllipsis && (
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem>
//         )} */}

//           {/* Next page button */}
//           <PaginationItem>
//             <PaginationButton
//               variant="outline"
//               aria-label="Go to next page"
//               aria-disabled={pagination.IsLast() ? true : undefined}
//               role={pagination.IsLast() ? "link" : undefined}
//               className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//             >
//               <LuChevronRight size={16} aria-hidden="true" />
//             </PaginationButton>
//           </PaginationItem>

//           {/* Last page button */}
//           <PaginationItem>
//             <PaginationButton
//               variant="outline"
//               aria-label="Go to last page"
//               aria-disabled={pagination.IsLast() ? true : undefined}
//               role={pagination.IsLast() ? "link" : undefined}
//               className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//             >
//               <LuChevronLast size={16} aria-hidden="true" />
//             </PaginationButton>
//           </PaginationItem>
//         </PaginationContent>
//       </ShadcnPagination>

//       <p
//         className="text-muted-foreground ms-auto text-sm whitespace-nowrap"
//         aria-live="polite"
//       >
//         Page <span className="text-foreground">{pagination.Page}</span> of{" "}
//         <span className="text-foreground">{pagination.TotalPages}</span>
//       </p>
//     </div>
//   );
// }
