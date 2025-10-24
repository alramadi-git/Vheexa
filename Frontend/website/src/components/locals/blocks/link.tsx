"use client";

import type { ComponentProps } from "react";

import { useSearchParams } from "next/navigation";

// eslint-disable-next-line no-restricted-imports
import { Link as NextLink, usePathname } from "@/i18n/navigation";

function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} />;
}

function LinkLocale(
  props: Omit<ComponentProps<typeof Link>, "href">,
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = `${pathname}${searchParams.size === 0 ? "" : "?"}${searchParams.toString()}`;
  return <Link href={href} {...props} />;
}

export {
  Link,
  LinkLocale,
}