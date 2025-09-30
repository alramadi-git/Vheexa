import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/navigation-menu";
import { getTranslations } from "next-intl/server";

type TLink = {
  id: number;
  href: string;
  label: string;
};

export default async function Navigation() {
  const t = await getTranslations("app.user.layout.header");
  const navigation: Array<TLink> = t.raw("navigation");

  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList className="gap-2">
        {navigation.map((navigationItem) => (
          <NavigationMenuItem key={navigationItem.id}>
            <NavigationMenuLink
              href={navigationItem.href}
              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
            >
              {navigationItem.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
