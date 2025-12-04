import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import Form from "@/components/locals/partner/authentication/login/page/form";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.partner.authentication.login.page")).raw(
    "metadata",
  );
}

export default async function Page() {
  const tForm = await getTranslations(
    "app.partner.authentication.login.page.form",
  );

  return (
    <div className="flex flex-col justify-between gap-6 p-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{tForm("title")}</h1>
        <p className="text-muted-foreground text-balance">
          {tForm("description")}
        </p>
      </div>

      <Form />
    </div>
  );
}
