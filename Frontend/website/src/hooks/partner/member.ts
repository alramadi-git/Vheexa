import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ClsMemberService } from "@/services/partner/member";

import { tMemberFilter } from "@/validations/partner/member";
import { tPagination } from "@/validations/pagination";

export default function useMembers() {
  const searchParams = useSearchParams();
  const clsMemberService = new ClsMemberService();

  const [minBirthday, maxBirthday, status, page, pageSize] = [
    searchParams.get("filter.birthday.min"),
    searchParams.get("filter.birthday.max"),
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const filter: tMemberFilter = {
    search: searchParams.get("filter.search") ?? undefined,
    location: searchParams.get("filter.location") ?? undefined,
    birthday: {
      min: minBirthday !== null ? new Date(minBirthday) : undefined,
      max: maxBirthday !== null ? new Date(maxBirthday) : undefined,
    },
    status: status !== null ? Number(status) : undefined,
  };
  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "members",
      filter.search,
      filter.birthday.min,
      filter.birthday.max,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => clsMemberService.getManyAsync(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
