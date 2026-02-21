"use client";

import type { ComponentProps } from "react";

import { useSearchParams } from "next/navigation";

// eslint-disable-next-line no-restricted-imports
import { usePathname, Link as I18NLink } from "@/i18n/navigation";

export function Link(props: ComponentProps<typeof I18NLink>) {
  return <I18NLink {...props} />;
}

export function LinkLocale(props: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = `${pathname}${searchParams.size === 0 ? "" : "?"}${searchParams.toString()}`;
  return <Link href={href} {...props} />;
}
