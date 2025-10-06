"use client";

import type { TNullable } from "@/types/nullish";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams as useSearchParamsNextJS } from "next/navigation";

export function useSearchParams() {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParamsNextJS().toString());

  function ToString() {
    const searchParamsString = searchParams.toString();
    return searchParamsString === "" ? "" : `?${searchParamsString}`;
  }

  function Get(key: string): TNullable<string> {
    return searchParams.get(key);
  }

  function Set(key: string, value: string) {
    searchParams.set(key, value);
    router.push(ToString());
  }

  function Delete(key: string) {
    searchParams.delete(key);
    router.push(ToString());
  }

  return {
    ToString,
    Get,
    Set,
    Delete,
  };
}
