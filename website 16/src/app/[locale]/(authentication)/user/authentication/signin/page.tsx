import { setRequestLocale, getTranslations } from "next-intl/server";

import { Fragment } from "react";
import Form from "@/app/[locale]/(authentication)/user/authentication/signin/_components/form";

export const dynamic = "force-static";

export default async function Page(
  props: PageProps<"/[locale]/user/authentication/signin">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("app.user.authentication.page");

  return (
    <Fragment>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-balance">{t("description")}</p>
      </div>

      <Form />
    </Fragment>
  );
}
