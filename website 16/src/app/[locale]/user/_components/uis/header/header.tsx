import { getTranslations } from "next-intl/server";

import { Container } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/image";
import { Link } from "@/components/locals/blocks/link";
import { Button } from "@/components/shadcn/button";
import Search from "@/app/[locale]/user/_components/uis/header/search";
import MobileNavigation from "@/app/[locale]/user/_components/uis/header/mobile-navigation";
import Navigation from "@/app/[locale]/user/_components/uis/header/navigation";
import Languages from "@/app/[locale]/user/_components/uis/header/languages";

export default async function Component() {
  const t = await getTranslations("app.user.layout.header");

  return (
    <header
      className="bg-background fixed top-0 left-0 z-50 w-full border-b shadow-lg"
    >
      <Container>
        {/** Top navigation */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/** Logo */}
          <Link href="/user" className="border-e pe-3">
            <FullHDImage
              src={t("logo.src")}
              alt={t("logo.alt")}
              className="size-6"
            />
          </Link>

          {/** Top Middle */}
          <div>
            <Search />
          </div>

          {/** Top End */}
          <div className="flex w-full items-center justify-end gap-2">
            <Button asChild>
              <Link href="/user/auth/signin">{t("signin-label")}</Link>
            </Button>
            <Languages />
            <MobileNavigation />
          </div>
        </div>

        {/** Bottom navigation */}
        <div className="border-t py-2 max-md:hidden">
          <Navigation />
        </div>
      </Container>
    </header>
  );
}
