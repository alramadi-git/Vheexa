import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Fragment } from "react";

import Form from "@/components/templates/user/authentication/login/page/form";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.user.authentication.login.page")).raw(
    "metadata",
  );
}

export default async function Page() {
  const tLogin = await getTranslations(
    "app.user.authentication.login.page",
  );

  return (
    <Fragment>
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold">{tLogin("title")}</h1>
        <p className="text-muted-foreground text-balance">
          {tLogin("description")}
        </p>
      </div>
      <Form />
    </Fragment>
  );
}
