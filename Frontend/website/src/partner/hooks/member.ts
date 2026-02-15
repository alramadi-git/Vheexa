"use client";

import { useSearchParams } from "next/navigation";
import useMemberService from "@/partner/services/member";

import { useQuery } from "@tanstack/react-query";

import { tMemberFilter } from "@/partner/validators/member";
import { tPagination } from "@/validators/pagination";
import { useEffect, useState } from "react";

export default function useMembers() {
  const [run, setRun] = useState(false);

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
    searchParams.getAll("filter.role-uuids"),
    searchParams.getAll("filter.branch-uuids"),
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
    roleUuids: roles,
    branchUuids: branches,
    status,
  };

  const pagination: tPagination = {
    page,
    pageSize,
  };

  const { isEnabled, isLoading, data: result } = useQuery({
    enabled: run,
    queryKey: [
      "members",
      filter.search,
      filter.roleUuids.join(", "),
      filter.branchUuids.join(", "),
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => memberService.search(filter, pagination),
  });

  useEffect(() => {
    setRun(true);
  }, []);

  return {
    isLoading: !isEnabled || isLoading ,
    result,
  };
}
