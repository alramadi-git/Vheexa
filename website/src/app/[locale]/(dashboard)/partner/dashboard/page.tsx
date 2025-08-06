import type { TPageComponent } from "@/types/next";

import { setRequestLocale } from "next-intl/server";
import { Fragment } from "react";

export const dynamic = "force-static";
export default async function Page(props: TPageComponent) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <section className="h-[5000px]">
        <h2>Partner</h2>
      </section>
    </Fragment>
  );
}
