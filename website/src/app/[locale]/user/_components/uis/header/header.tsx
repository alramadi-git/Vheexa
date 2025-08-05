import { getTranslations } from "next-intl/server";

import { Button } from "@/components/shadcn/button";
import NextIntlLink from "@/components/locals/blocks/next-intl-link";
import Floating from "@/app/[locale]/user/_components/uis/header/floating";
import LocaleSelector from "@/app/[locale]/user/_components/uis/header/locale-selector";

type TNavLinks = Array<{
  url: string;
  label: string;
}>;

export default async function Header() {
  const t = await getTranslations("app.page.header");

  const links: TNavLinks = t.raw("nav.links");

  return (
    <Floating>
      <nav className="hidden w-full justify-between gap-6 lg:flex">
        <ul className="flex items-center gap-8">
          {links.map((item, index) => (
            <li key={index}>
              <NextIntlLink
                href={item.url}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{item.label}</span>
              </NextIntlLink>
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-3.5">
          <LocaleSelector />

          <Button asChild variant="outline" className="inline-flex">
            <NextIntlLink href="/auth/signin">
              <span>Get Started</span>
            </NextIntlLink>
          </Button>
        </div>
      </nav>

      <nav className="bg-background absolute top-18 left-1/2 mb-6 hidden w-full -translate-x-1/2 flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:hidden lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
        <ul className="w-full space-y-3">
          {links.map((item, index) => (
            <li key={index}>
              <NextIntlLink
                href={item.url}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{item.label}</span>
              </NextIntlLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-3.5">
          <Button asChild variant="outline" className="inline-flex">
            <NextIntlLink href="/auth/signin">
              <span>Get Started</span>
            </NextIntlLink>
          </Button>

          <LocaleSelector className="w-full" />
        </div>
      </nav>
    </Floating>
  );
}
