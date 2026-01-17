"use client";

import { useSearchParams as useSearchParamsNextJS } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

import { useEffect, useState } from "react";

import { ClsQuery } from "@/libraries/query";

import { tUndefinable, tNullable } from "@/types/nullish";

export function useQuery() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParamsNextJS();

  const [query, setQuery] = useState(new ClsQuery(searchParams.toString()));

  useEffect(() => {
    setQuery(new ClsQuery(searchParams.toString()));
  }, [searchParams]);

  function toString(): string {
    return query.toString();
  }

  function get(key: string): tNullable<string> {
    return query.get(key);
  }

  function getAll(key: string): string[] {
    return query.getAll(key);
  }

  function set(key: string, value?: string): void;
  function set(key: string, value: string[]): void;
  function set(key: string, value: tUndefinable<string> | string[]): void {
    if (value === undefined || typeof value === "string") query.set(key, value);
    else query.set(key, value);
  }

  function remove(key: string): void {
    query.delete(key);
  }

  function clear(): void {
    setQuery(new ClsQuery());
  }

  function apply(options?: Parameters<typeof router.push>["1"]): void {
    router.push(`${pathname}${toString()}`, options);
  }

  return {
    get,
    getAll,
    set,
    remove,
    clear,
    apply,
  };
}
