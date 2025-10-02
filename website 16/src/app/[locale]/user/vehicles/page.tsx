import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import Hero from "@/app/[locale]/user/vehicles/_components/uis/hero/hero";

export default async function Page({ params }: PageProps<"/[locale]/user">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
}
