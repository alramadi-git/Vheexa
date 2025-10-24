"use client";

import type { tUndefinable } from "@/types/nullish";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams as useSearchParamsNextJS } from "next/navigation";

export function useSearchParams() {
  const router = useRouter();

  const pathname = usePathname();
  let searchParams = new URLSearchParams(useSearchParamsNextJS().toString());

  function getOne(key: string): tUndefinable<string> {
    return searchParams.get(key) ?? undefined;
  }
  function getMany(keys: Array<string>): Array<tUndefinable<string>> {
    const values: Array<tUndefinable<string>> = [];
    for (const key of keys) values.push(getOne(key));

    return values;
  }

  function setOne(key: string, value: string): void {
    searchParams.set(key, value);
  }
  function setMany(kv: Array<[string, string]>): void {
    for (const [key, value] of kv) setOne(key, value);
  }

  function deleteOne(key: string): void {
    searchParams.delete(key);
  }
  function deleteMany(keys: Array<string>): void {
    for (const key of keys) deleteOne(key);
  }

  function clear(): void {
    searchParams = new URLSearchParams();
  }

  function toString(): string {
    const urlString = searchParams.toString();
    return urlString === "" ? "" : `?${urlString}`;
  }

  function apply(options?: Parameters<typeof router.push>["1"]): void {
    router.push(`${pathname}${toString()}`, options);
  }

  return {
    getOne,
    getMany,
    setOne,
    setMany,
    deleteOne,
    deleteMany,
    clear,
    apply,
  };
}
