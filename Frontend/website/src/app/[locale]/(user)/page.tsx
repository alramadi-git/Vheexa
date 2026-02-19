import Hero from "@/components/templates/user/page/hero/hero";
import Stats from "@/components/templates/user/page/stats/stats";
import Features from "@/components/templates/user/page/features/features";
import HowItWorks from "@/components/templates/user/page/how-it-works/how-it-works";
import FAQs from "@/components/templates/user/page/faqs/faqs";

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
