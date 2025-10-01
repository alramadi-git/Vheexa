import type { Direction } from "@radix-ui/react-navigation-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";
import { Link } from "@/components/locals/blocks/link";
import { getTranslations } from "next-intl/server";

type TNavigationItem = {
  id: number;
  href: string;
  label: string;
};

type TSubNavigationItem2 = {
  id: number;
  href: string;
  label: string;
  description: string;
};

type TSubNavigationItem = {
  id: number;
  label: string;
  submenu?: Array<TSubNavigationItem2>;
};

export default async function NavigationMenuWithDropdown() {
  const t = await getTranslations("app.user.layout.header");
  const navigation: Array<TNavigationItem | TSubNavigationItem> =
    t.raw("navigation.links");

  const dir: Direction = t("navigation.dir") as Direction;

  return (
    <NavigationMenu dir={dir} className="z-20">
      <NavigationMenuList>
        {navigation.map((navigationItem) => {
          if ("submenu" in navigationItem)
            return (
              <NavigationMenuItem key={navigationItem.id}>
                <NavigationMenuTrigger>
                  {navigationItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {navigationItem.submenu?.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <NavigationMenuLink asChild>
                          <Link href={submenuItem.href}>
                            <span className="leading-none font-medium">
                              {submenuItem.label}
                            </span>
                            <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
                              {submenuItem.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );

          return <></>;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
