import Account from "./account";
import Languages from "@/components/locals/blocks/languages";

import DesktopNavigation from "@/components/locals/user/layout/header/desktop-navigation";
import MobileNavigation from "@/components/locals/user/layout/header/mobile-navigation";

import { Container } from "@/components/locals/blocks/typography";
import { Link } from "@/components/locals/blocks/links";

import { Logo } from "@/components/locals/blocks/images";

export default async function Header() {
  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="hidden w-full items-center gap-2 md:flex">
            <Languages />
            <Account />
          </div>
          <MobileNavigation />
          <Link href="/user" className="border-s ps-3">
            <Logo className="size-8" />
          </Link>
        </div>
        <div className="hidden border-t py-2 md:block">
          <DesktopNavigation />
        </div>
      </Container>
    </header>
  );
}
