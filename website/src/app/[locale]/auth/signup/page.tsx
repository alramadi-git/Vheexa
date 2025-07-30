import type { Metadata } from "next";
import type { TParamsLocale } from "@/types/params";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Fragment } from "react";

type TGenerateMetadata = {
  props: TParamsLocale;
  return: Promise<Metadata>;
};

type TPage = {
  props: TParamsLocale;
};

export const dynamic = "force-static";
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "auth.signin" });

  return t.raw("metadata");
}

export default async function Page(props: TPage["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <Fragment></Fragment>;
}
