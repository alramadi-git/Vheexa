import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import Form from "./_components/form";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/user/authentication/login">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "app.user.authentication.login.page",
  });

  return t.raw("metadata");
}

export default async function Page({
  params,
}: PageProps<"/[locale]/user/authentication/login">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("app.user.authentication.login.page.card");

  return (
    <div className="flex flex-col justify-between gap-6 p-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-balance">{t("description")}</p>
      </div>

      <Form />
    </div>
  );
}
