import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import Hero from "./_components/hero/hero";

export const dynamic = "force-static";

export default async function Page(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
}
