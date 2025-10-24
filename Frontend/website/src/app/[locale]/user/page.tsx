import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import Hero from "@/app/[locale]/user/_components/uis/hero/hero";
import Stats from "@/app/[locale]/user/_components/uis/stats/stats";
import Features from "@/app/[locale]/user/_components/uis/features/features";
import HowItWorks from "@/app/[locale]/user/_components/uis/how-it-works/how-it-works";
import FAQs from "@/app/[locale]/user/_components/uis/faqs/faqs";

export const dynamic = "force-static";

export default async function Page(props: PageProps<"/[locale]/user">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <Fragment>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FAQs />
    </Fragment>
  );
}
