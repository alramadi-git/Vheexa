import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import Contact from "@/components/locals/user/contact/page/contact/contact";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.user.contact.page")).raw("metadata");
}

export default async function Page() {
  return <Contact />;
}
