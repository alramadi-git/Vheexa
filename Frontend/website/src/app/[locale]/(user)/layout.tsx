import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Fragment } from "react";

import Header from "@/components/locals/user/layout/header/header";
import Footer from "@/components/locals/user/layout/footer/footer";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.user.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
