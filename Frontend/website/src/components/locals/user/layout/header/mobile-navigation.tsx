import { getTranslations } from "next-intl/server";

import { LuMenu, LuX } from "react-icons/lu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/shadcn/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Container } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

import Languages from "../../../blocks/languages";
import Account from "./account";

type tSubNavigationMenuItem = {
  id: number;
  href: string;
  label: string;
  description: string;
};
type tSubNavigationMenu = {
  id: number;
  label: string;
  submenu: tSubNavigationMenuItem[];
};


export default async function MobileNavigation() {
  const tSettings = await getTranslations("settings");

  const tHeader = await getTranslations("app.user.layout.header");
  const navigationMenu: tSubNavigationMenu[] = tHeader.raw("navigation-menu");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <LuMenu className="size-full" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={tSettings("direction") === "ltr" ? "left" : "right"}
        className="w-full"
      >
        <Container className="flex h-full flex-col gap-4 p-4">
          <SheetHeader className="flex flex-row flex-wrap gap-2 p-0">
            <VisuallyHidden>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </VisuallyHidden>

            <SheetClose asChild>
              <Button variant="outline" className="w-fit">
                <LuX />
              </Button>
            </SheetClose>

            <Languages align="end" className="grow" />
            {/* <Account align="end" /> */}
          </SheetHeader>

          <Accordion
            collapsible
            type="single"
            className="h-full"
            defaultValue="3"
          >
            {navigationMenu.map((item) => (
              <SubNavigationMenu key={item.id} subNavigationMenu={item} />
            ))}
          </Accordion>
        </Container>
      </SheetContent>
    </Sheet>
  );
}

type tSubNavigationMenuProps = {
  subNavigationMenu: tSubNavigationMenu;
};
function SubNavigationMenu({ subNavigationMenu }: tSubNavigationMenuProps) {
  return (
    <AccordionItem value={subNavigationMenu.id.toString()} className="py-2">
      <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
        {subNavigationMenu.label}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pb-2">
        <ul className="flex flex-col gap-2">
          {subNavigationMenu.submenu.map((submenu) => (
            <li key={submenu.id}>
              <SheetClose asChild>
                <Link
                  href={submenu.href}
                  className="inline-block duration-150 hover:indent-1 hover:underline"
                >
                  {submenu.label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
