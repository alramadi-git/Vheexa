import { type TParamsLocale } from "@/types/params";
import { setRequestLocale } from "next-intl/server";
import { Fragment, type PropsWithChildren } from "react";
import Header from "@/app/[locale]/user/_components/uis/header/header";
import Footer from "@/app/[locale]/user/_components/uis/footer/footer";

type TLayoutProps = TParamsLocale & PropsWithChildren & {};

export const dynamic = "force-static";
export default async function Layout(props: TLayoutProps) {
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
