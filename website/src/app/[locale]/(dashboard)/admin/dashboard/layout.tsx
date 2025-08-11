import type { Metadata } from "next";
import type { TLayoutMetadata, TLayoutComponent } from "@/types/next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import { SidebarInset } from "@/components/shadcn/sidebar";
import Header from "@/app/[locale]/(dashboard)/partner/dashboard/_components/uis/header/header";
import Sidebar from "@/app/[locale]/(dashboard)/partner/dashboard/_components/uis/sidebar/sidebar";

export const dynamic = "force-static";
export async function generateMetadata(
  props: TLayoutMetadata,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "admin.dashboard" });

  return t.raw("metadata");
}

export default async function Layout(props: TLayoutComponent) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Sidebar />
      <SidebarInset>
        <Header />
        <main>{props.children}</main>
      </SidebarInset>
    </Fragment>
  );
}
