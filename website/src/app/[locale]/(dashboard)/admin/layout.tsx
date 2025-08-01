import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TParamsLocale } from "@/types/params";

import { getTranslations, setRequestLocale } from "next-intl/server";

import Header from "@/app/[locale]/(dashboard)/admin/_components/uis/header/header";
import Footer from "@/app/[locale]/(dashboard)/admin/_components/uis/footer/footer";
import Sidebar from "@/app/[locale]/(dashboard)/admin/_components/uis/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";

type TGenerateMetadata = {
  props: TParamsLocale;
  return: Promise<Metadata>;
};
type TLayout = {
  props: TParamsLocale & PropsWithChildren;
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
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
