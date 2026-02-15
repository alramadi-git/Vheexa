"use client";

import { useSearchParams } from "next/navigation";
import useRoleService from "@/partner/services/role";

import { useQuery } from "@tanstack/react-query";

import { tRoleFilter } from "@/partner/validators/role";
import { tPagination } from "@/validators/pagination";
import { useEffect, useState } from "react";

export default function useRoles() {
  const [run, setRun] = useState(false);

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

  const { isEnabled, isLoading, data: result } = useQuery({
    enabled: run,
    queryKey: [
      "roles",
      filter.name,
      filter.permissions.join(", "),
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => roleService.search(filter, pagination),
  });

  useEffect(() => {
    setRun(true);
  }, []);

  return {
    isLoading: !isEnabled || isLoading ,
    result,
  };
}
