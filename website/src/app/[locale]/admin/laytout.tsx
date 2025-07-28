import { PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";
import { type TParamsLocale } from "@/types/params";

type TGenerateMetadataProps = TParamsLocale & {};
type TLayoutProps = PropsWithChildren & {};

export const dynamic = "force-static";
export async function generateMetadata(props: TGenerateMetadataProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "admin" });

  return t("metadata");
}

export default function Layout(props: TLayoutProps) {
  return props.children;
}
