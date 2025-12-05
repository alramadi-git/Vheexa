import { getTranslations } from "next-intl/server";

import Account from "./account";
import Languages from "@/components/locals/user/header/languages";

import DesktopNavigation from "@/components/locals/user/header/desktop-navigation";
import MobileNavigation from "@/components/locals/user/header/mobile-navigation";

import { Container } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/images";
import { Link } from "@/components/locals/blocks/links";

export default async function Header() {
  const tHeader = await getTranslations("app.user.layout.header");

  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <Container>
        {/** Top navigation */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/** Account & Languages | Desktop */}
          <div className="hidden w-full items-center gap-2 md:flex">
            <Languages />
            <Account />
          </div>

          {/** Account, Languages & Navigation | Mobile */}
          <MobileNavigation />

          {/** Logo */}
          <Link href="/user" className="border-s ps-3">
            <FullHDImage
              src={tHeader("logo.src")}
              alt={tHeader("logo.alt")}
              className="size-8 object-contain"
            />
          </Link>
        </div>

        {/** Bottom navigation */}
        <div className="hidden border-t py-2 md:block">
          <DesktopNavigation />
        </div>
      </Container>
    </header>
  );
}
