"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { ClsQuery } from "@/libraries/query";
import { useSearchParams as useSearchParamsNextJS } from "next/navigation";
import { useState } from "react";

export function useQuery() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParamsNextJS();

  const [query, setQuery] = useState(new ClsQuery(searchParams.toString()));

  function set(key: string, value?: string): void {
    query.set(key, value);
  }

  function remove(key: string): void {
    query.delete(key);
  }

  function clear(): void {
    setQuery(new ClsQuery());
  }

  function toString(): string {
    return query.toString();
  }

  function apply(options?: Parameters<typeof router.push>["1"]): void {
    router.push(`${pathname}${toString()}`, options);
  }

  return {
    set,
    remove,
    clear,
    apply,
  };
}
