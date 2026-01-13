import { Metadata } from "next";
import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.partner.authentication.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]/partner/authentication">): Promise<ReactNode> {
  return children;
}
