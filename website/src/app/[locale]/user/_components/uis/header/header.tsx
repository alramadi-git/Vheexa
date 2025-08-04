import { getTranslations } from "next-intl/server";

import Link from "@/components/locals/blocks/next-intl-link";
import LocaleSelector from "@/app/[locale]/user/_components/uis/header/locale-selector";
import Floating from "./floating";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/utilities/cn";

type TNavLinks = Array<{
  url: string;
  label: string;
}>;

export default async function Header() {
  const t = await getTranslations("app.page.header");

  const NAV_LINKS: TNavLinks = t.raw("nav.links");

  return (
    <Floating>
      <nav className="absolute inset-0 top-1.5 m-auto hidden size-fit lg:block">
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
        <div className="lg:hidden">
          <ul className="space-y-3">
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="text-muted-foreground hover:text-primary block duration-150"
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild size="sm" className="inline-flex">
          <Link href="/auth/signup">
            <span>Get Started</span>
          </Link>
        </Button>

        <LocaleSelector />
      </nav>
    </Floating>
  );
}
