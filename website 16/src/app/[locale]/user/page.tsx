import { setRequestLocale } from "next-intl/server";

import Hero from "@/app/[locale]/user/_components/uis/hero/hero";
import Stats from "@/app/[locale]/user/_components/uis/stats/stats";
import Features from "@/app/[locale]/user/_components/uis/features/features";
import HowItWorks from "@/app/[locale]/user/_components/uis/how-it-works/how-it-works";
import FAQs from "@/app/[locale]/user/_components/uis/faqs/faqs";
import CallToAction from "@/app/[locale]/user/_components/uis/call-to-action/call-to-action";

export const dynamic = "force-static";

export default async function Page(props: PageProps<"/[locale]/user">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="h-[5000px]">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FAQs />
      <CallToAction />
    </main>
  );
}
