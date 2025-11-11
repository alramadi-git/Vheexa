import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";

import Hero from "@/components/locals/[user]/[vehicles]/hero/hero";
import Products from "@/components/locals/[user]/[vehicles]/products/products";

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
