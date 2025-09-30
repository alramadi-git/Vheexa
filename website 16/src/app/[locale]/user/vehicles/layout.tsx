import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export async function generateMetadata(
  props: LayoutProps<"/[locale]/user/vehicles">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "app.user.vehicles.layout",
  });

  return t.raw("metadata");
}

export default async function LayoutLayout(
  props: LayoutProps<"/[locale]/user/vehicles">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return;
}
