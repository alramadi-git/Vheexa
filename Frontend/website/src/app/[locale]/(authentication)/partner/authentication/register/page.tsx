import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Fragment } from "react";
import Form from "@/components/locals/partner/authentication/register/page/form";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (
    await getTranslations("app.partner.authentication.register.page")
  ).raw("metadata");
}

export default async function Page() {
  const tRegister = await getTranslations(
    "app.partner.authentication.register.page",
  );

  return (
    <Fragment>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{tRegister("title")}</h1>
        <p className="text-muted-foreground text-balance">
          {tRegister("description")}
        </p>
      </div>
      <Form />
    </Fragment>
  );
}
