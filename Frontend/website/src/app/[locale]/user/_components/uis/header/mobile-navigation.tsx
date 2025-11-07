import { getTranslations } from "next-intl/server";

import Languages from "./languages";
import Account from "./account";

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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Container } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { Link } from "@/components/locals/blocks/link";

type tSubNavigationMenuItem = {
  id: number;
  href: string;
  label: string;
  description: string;
};
type tSubNavigationMenu = {
  id: number;
  label: string;
  submenu: Array<tSubNavigationMenuItem>;
};

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

export default async function MobileNavigation() {
  const tApp = await getTranslations("app.settings");

  const tHeader = await getTranslations("app.user.layout.header");
  const tNavigationMenu: Array<tSubNavigationMenu> =
    tHeader.raw("navigation-menu");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <LuMenu className="size-full" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={tApp("dir") === "ltr" ? "left" : "right"}
        className="w-full"
      >
        <Container className="flex h-full flex-col gap-4 p-4">
          <SheetHeader className="flex flex-row gap-2 p-0">
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

            <Languages align="end" className="w-full" />
            <Account align="end" />
          </SheetHeader>

          <Accordion
            collapsible
            type="single"
            className="h-full"
            defaultValue="3"
          >
            {tNavigationMenu.map((item) => (
              <SubNavigationMenu key={item.id} subNavigationMenu={item} />
            ))}
          </Accordion>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
