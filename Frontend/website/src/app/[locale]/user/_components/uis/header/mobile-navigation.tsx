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

// type tLink = {
//   id: number;
//   href: string;
//   label: string;
// };

export default async function MobileNavigation() {
  const tApp = await getTranslations("app.settings");

  // const tHeader = await getTranslations("app.user.layout.header");
  // const navigation: Array<tLink> = tHeader.raw("navigation.links");

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

          <div className="h-full"></div>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
