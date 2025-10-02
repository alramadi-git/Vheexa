import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: Omit<
  LayoutProps<"/[locale]/user/vehicles">,
  "children"
>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "app.user.vehicles.layout",
  });

  return t.raw("metadata");
}

export default async function LayoutLayout({
  children,
}: LayoutProps<"/[locale]/user/vehicles">) {
  return children;
}
