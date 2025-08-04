"use client";

import type { ComponentProps } from "react";

import { usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

import NextIntlLink from "@/components/locals/blocks/next-intl-link";

type TNextIntlLinkLocale = {
  props: Omit<ComponentProps<typeof NextIntlLink>, "href">;
};
export default function NextIntlLinkLocale(
  props: TNextIntlLinkLocale["props"],
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = `${pathname}${searchParams.size !== 0 ? "?" : ""}${searchParams.toString()}`;
  return <NextIntlLink href={href} {...props} />;
}
