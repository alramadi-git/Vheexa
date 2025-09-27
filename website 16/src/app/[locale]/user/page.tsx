import { setRequestLocale } from "next-intl/server";
import Hero from "./_components/uis/hero/hero";
import Features from "./_components/uis/features/features";

export const dynamic = "force-static";

export default async function Page(props: PageProps<"/[locale]/user">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="h-[5000px]">
      <Hero />
      <Features />
    </main>
  );
}
