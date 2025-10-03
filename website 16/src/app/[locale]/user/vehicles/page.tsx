import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import Hero from "@/app/[locale]/user/vehicles/_components/uis/hero/hero";
import DataList from "@/app/[locale]/user/vehicles/_components/uis/data-list/data-list";

export default async function Page({ params }: PageProps<"/[locale]/user">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Hero />
      <DataList />
    </Fragment>
  );
}
