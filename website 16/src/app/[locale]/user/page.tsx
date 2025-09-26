import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export default async function Page(props: PageProps<"/[locale]/user">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <div className="h-[5000px]"></div>;
}
