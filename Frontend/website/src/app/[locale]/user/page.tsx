import Hero from "@/components/locals/user/page/hero/hero";
import Stats from "@/components/locals/user/page/stats/stats";
import Features from "@/components/locals/user/page/features/features";
import HowItWorks from "@/components/locals/user/page/how-it-works/how-it-works";
import FAQs from "@/components/locals/user/page/faqs/faqs";

export const dynamic = "force-static";

export default async function Page() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FAQs />
    </main>
  );
}
