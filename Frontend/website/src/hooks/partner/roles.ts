"use client";

import { useSearchParams } from "next/navigation";
import useRoleService from "@/services/partner/role";

import { useQuery } from "@tanstack/react-query";

import { tRoleFilter } from "@/validations/partner/role";
import { tPagination } from "@/validations/pagination";

export default function useRoles() {
  const searchParams = useSearchParams();
  const roleService = useRoleService();

  const [nameQuery, permissionsQuery, statusQuery, pageQuery, pageSizeQuery] = [
    searchParams.get("filter.name"),
    searchParams.getAll("filter.permissions"),
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const [name, permissions, status, page, pageSize] = [
    nameQuery ?? undefined,
    permissionsQuery.map((permission) => Number(permission)),
    statusQuery !== null ? Number(statusQuery) : undefined,
    pageQuery !== null ? Number(pageQuery) : undefined,
    pageSizeQuery !== null ? Number(pageSizeQuery) : undefined,
  ];

  const filter: tRoleFilter = {
    name,
    permissions,
    status,
  };

  const pagination: tPagination = {
    page,
    pageSize,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "roles",
      filter.name,
      filter.permissions.join(", "),
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => roleService.readMany(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
