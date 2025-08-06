import type { TLocale } from "@/types/next";

import { setRequestLocale } from "next-intl/server";

type TPage = {
  props: TLocale;
};

export const dynamic = "force-static";
export default async function Page(props: TPage["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </section>
  );
}
