import { setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import Hero from "@/components/locals/user/hero/hero";
import Stats from "@/components/locals/user/stats/stats";
import Features from "@/components/locals/user/features/features";
import HowItWorks from "@/components/locals/user/how-it-works/how-it-works";
import FAQs from "@/components/locals/user/faqs/faqs";

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
