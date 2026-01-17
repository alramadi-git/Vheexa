"use client";

import { useSearchParams } from "next/navigation";
import useMemberService from "@/services/partner/member";

import { useQuery } from "@tanstack/react-query";

import { tMemberFilter } from "@/validations/partner/member";
import { tPagination } from "@/validations/pagination";

export default function useMembers() {
  const searchParams = useSearchParams();
  const memberService = useMemberService();

  const [
    searchQuery,
    rolesQuery,
    branchesQuery,
    statusQuery,
    pageQuery,
    pageSizeQuery,
  ] = [
    searchParams.get("filter.search"),
    searchParams.getAll("filter.roles"),
    searchParams.getAll("filter.branches"),
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const [search, roles, branches, status, page, pageSize] = [
    searchQuery ?? undefined,
    rolesQuery,
    branchesQuery,
    statusQuery !== null ? Number(statusQuery) : undefined,
    pageQuery !== null ? Number(pageQuery) : undefined,
    pageSizeQuery !== null ? Number(pageSizeQuery) : undefined,
  ];

  const filter: tMemberFilter = {
    search,
    roles,
    branches,
    status,
  };

  const pagination: tPagination = {
    page,
    pageSize,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "members",
      filter.search,
      filter.roles.join(", "),
      filter.branches.join(", "),
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => memberService.readMany(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
