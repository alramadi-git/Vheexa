import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ClsRoleService } from "@/services/partner/role";

import { tRoleFilter } from "@/validations/partner/role";
import { tPagination } from "@/validations/pagination";

export default function useRoles() {
  const searchParams = useSearchParams();
  const clsRoleService = new ClsRoleService();

  const [status, page, pageSize] = [
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const filter: tRoleFilter = {
    name: searchParams.get("filter.name") ?? undefined,
    permissions: searchParams
      .getAll("filter.permissions")
      .map((permission) => Number(permission)),
    status: status !== null ? Number(status) : undefined,
  };
  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "roles",
      filter.name,
      filter.permissions,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => clsRoleService.getManyAsync(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
