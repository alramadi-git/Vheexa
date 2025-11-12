import Hero from "@/components/locals/[user]/hero/hero";
import Stats from "@/components/locals/[user]/stats/stats";
import Features from "@/components/locals/[user]/features/features";
import HowItWorks from "@/components/locals/[user]/how-it-works/how-it-works";
import FAQs from "@/components/locals/[user]/faqs/faqs";

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
