import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TLocale } from "@/types/next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import Header from "@/app/[locale]/(dashboard)/_admin/_components/uis/header/header";
import Sidebar from "@/app/[locale]/(dashboard)/_admin/_components/uis/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";

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
  const t = await getTranslations({ locale, namespace: "admin" });

  return t.raw("metadata");
}

export default async function Layout(props: TLayout["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        <main>{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
