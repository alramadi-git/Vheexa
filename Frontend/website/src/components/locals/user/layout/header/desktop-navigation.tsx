import { getTranslations } from "next-intl/server";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";
import { Link } from "@/components/locals/blocks/links";
import { eEnvironment } from "@/enums/environment";

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

type tNavigationMenuItemProps = {
  item: Omit<tSubNavigationMenuItem, "id">;
};
function SubNavigationMenuItem({ item }: tNavigationMenuItemProps) {
  return (
    <NavigationMenuLink
      asChild={process.env.NODE_ENV === eEnvironment.development}
      // setting asChild to true in development works fine and nothing weird happens
      // in production the first link Hom doesn't appear doe to unknown issue
      // the only way to fix it so far is to set asChild to false in production and everything works fine
      // why only in production cuz in development it throws an error <a/> can't have a nested <a/> tag
    >
      <Link href={item.href}>
        <span className="leading-none font-medium">{item.label}</span>
        <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
          {item.description}
        </p>
      </Link>
    </NavigationMenuLink>
  );
}

type tNavigationMenuItemsProps = {
  items: tSubNavigationMenuItem[];
};
function SubNavigationMenuItems({ items }: tNavigationMenuItemsProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 p-1 md:w-[400px] lg:w-[500px]">
      {items.map(({ id, ...item }) => (
        <li key={id}>
          <SubNavigationMenuItem item={item} />
        </li>
      ))}
    </ul>
  );
}

type tSubNavigationMenuProps = {
  subNavigationMenu: Omit<tSubNavigationMenu, "id">;
};
function SubNavigationMenu({ subNavigationMenu }: tSubNavigationMenuProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{subNavigationMenu.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <SubNavigationMenuItems items={subNavigationMenu.submenu} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default async function DesktopNavigation() {
  const tHeader = await getTranslations("app.user.layout.header");
  const navigationMenu: tSubNavigationMenu[] =
    tHeader.raw("navigation-menu");

  return (
    <NavigationMenu className="z-20">
      <NavigationMenuList>
        {navigationMenu.map(({ id, ...subNavigationItem }) => (
          <SubNavigationMenu key={id} subNavigationMenu={subNavigationItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
