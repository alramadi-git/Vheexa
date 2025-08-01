"use client";

import type { ComponentProps } from "react";

// eslint-disable-next-line no-restricted-imports
import { Link } from "@/i18n/navigation";

type TNextIntlLink = {
  props: ComponentProps<typeof Link>;
};
export default function NextIntlLink(props: TNextIntlLink["props"]) {
  return <Link {...props}></Link>;
}
