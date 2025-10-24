import { getTranslations } from "next-intl/server";

import { Container } from "@/components/locals/blocks/typography";
import Search from "@/app/[locale]/user/_components/uis/header/search";
import Account from "./account";
import Languages from "@/app/[locale]/user/_components/uis/header/languages";
import Navigation from "@/app/[locale]/user/_components/uis/header/navigation";
// import MobileNavigation from "@/app/[locale]/user/_components/uis/header/mobile-navigation";
import { FullHDImage } from "@/components/locals/blocks/image";
import { Link } from "@/components/locals/blocks/link";

export default async function Header() {
  const t = await getTranslations("app.user.layout.header");

  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <Container>
        {/** Top navigation */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/** Logo */}
          <Link href="/user" className="border-e pe-3">
            <FullHDImage
              src={t("logo.src")}
              alt={t("logo.alt")}
              className="size-10 object-contain"
            />
          </Link>

          {/** Top Middle */}
          <div>
            <Search />
          </div>

          {/** Top End */}
          <div className="flex w-full items-center justify-end gap-2">
            <Account />

            <Languages />
            {/* <MobileNavigation /> */}
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
