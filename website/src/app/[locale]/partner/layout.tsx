import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TLocale } from "@/types/next";

import { getTranslations, setRequestLocale } from "next-intl/server";

type TGenerateMetadata = {
  props: TLocale;
  return: Promise<Metadata>;
};
type TLayout = {
  props: TLocale & PropsWithChildren;
};

export const dynamic = "force-static";
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "partner" });

  return t.raw("metadata");
}

export default async function Layout(props: TLayout["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return props.children;
}
