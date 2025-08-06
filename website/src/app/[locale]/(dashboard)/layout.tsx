import type { Metadata } from "next";
import type { TLayoutMetadata, TLayoutComponent } from "@/types/next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { SidebarProvider } from "@/components/shadcn/sidebar";

export const dynamic = "force-static";
export async function generateMetadata(
  props: TLayoutMetadata,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  return t.raw("metadata");
}

export default async function Layout(props: TLayoutComponent) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <SidebarProvider>{props.children}</SidebarProvider>;
}
