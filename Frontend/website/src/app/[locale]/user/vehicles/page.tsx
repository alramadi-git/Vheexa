import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";

import Hero from "@/app/[locale]/user/vehicles/_components/uis/hero/hero";
import Products from "@/app/[locale]/user/vehicles/_components/uis/products/products";

export default async function Page({ params }: PageProps<"/[locale]/user/vehicles">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Hero />
      <Products />
    </Fragment>
  );
}
