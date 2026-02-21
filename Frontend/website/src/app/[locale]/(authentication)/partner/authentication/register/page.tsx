import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import Form from "@/components/templates/partner/authentication/register/page/form";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (
    await getTranslations("app.partner.authentication.register.page")
  ).raw("metadata");
}

export default async function Page() {
  return <Form />;
}
