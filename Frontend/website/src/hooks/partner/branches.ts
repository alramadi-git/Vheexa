import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ClsBranchService } from "@/services/partner/branch";

import { tBranchFilter } from "@/validations/partner/branch";
import { tPagination } from "@/validations/pagination";

export default function useBranches() {
  const searchParams = useSearchParams();
  const clsBranchService = new ClsBranchService();

  const [status, page, pageSize] = [
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const filter: tBranchFilter = {
    search: searchParams.get("filter.search") ?? undefined,
    status: status !== null ? Number(status) : undefined,
  };
  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "branches",
      filter.search,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => clsBranchService.getManyAsync(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
