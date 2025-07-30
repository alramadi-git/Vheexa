import type { TParamsLocale } from "@/types/params";

import { setRequestLocale } from "next-intl/server";

type TPage = {
  props: TParamsLocale;
};

export const dynamic = "force-static";
export default async function Page(props: TPage["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <div className="h-[5000px]"></div>;
}
