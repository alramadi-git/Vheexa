import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TLocale } from "@/types/next";

import { getTranslations } from "next-intl/server";

type TGenerateMetadata = {
  props: TLocale;
  return: Promise<Metadata>;
};

type TPage = {
  props: PropsWithChildren;
};

export const dynamic = "force-static";
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app.auth.signup" });

  return t.raw("metadata");
}

export default async function Layout(props: TPage["props"]) {
  return props.children;
}
