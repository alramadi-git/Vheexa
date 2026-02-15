"use client";

import { useSearchParams } from "next/navigation";
import useBranchService from "@/partner/services/branch";

import { useQuery } from "@tanstack/react-query";

import { tBranchFilter } from "@/partner/validators/branch";
import { tPagination } from "@/validators/pagination";
import { useEffect, useState } from "react";

export default function useBranches() {
  const [run, setRun] = useState(false);

  const searchParams = useSearchParams();
  const branchService = useBranchService();

  const [searchQuery, statusQuery, pageQuery, pageSizeQuery] = [
    searchParams.get("filter.search"),
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const [search, status, page, pageSize] = [
    searchQuery ?? undefined,
    statusQuery !== null ? Number(statusQuery) : undefined,
    pageQuery !== null ? Number(pageQuery) : undefined,
    pageSizeQuery !== null ? Number(pageSizeQuery) : undefined,
  ];

  const filter: tBranchFilter = {
    search,
    status,
  };

  const pagination: tPagination = {
    page,
    pageSize,
  };

  const { isEnabled, isLoading, data: result } = useQuery({
    enabled: run,
    queryKey: [
      "branches",
      filter.search,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => branchService.search(filter, pagination),
  });

  useEffect(() => {
    setRun(true);
  }, []);

  return {
    isLoading: !isEnabled || isLoading ,
    result,
  };
}
