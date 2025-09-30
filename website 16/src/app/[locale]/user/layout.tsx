import { type Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Fragment } from "react";
import Header from "@/app/[locale]/user/_components/uis/header/header";
import Footer from "@/app/[locale]/user/_components/uis/footer/footer";

export const dynamic = "force-static";
export async function generateMetadata(
  props: LayoutProps<"/[locale]/user">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app.user.layout" });

  return t.raw("metadata");
}

export default async function Layout(props: LayoutProps<"/[locale]/user">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}
