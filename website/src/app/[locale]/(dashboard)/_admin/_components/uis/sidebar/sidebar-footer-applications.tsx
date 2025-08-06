import type { IconType } from "react-icons/lib";

import { getTranslations } from "next-intl/server";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";
import { LuChevronsUpDown } from "react-icons/lu";
import Link from "@/components/locals/blocks/next-intl-link";
import { FaUserGear, FaHouse, FaHandshakeSimple } from "react-icons/fa6";

type TApplication = Array<{
  href: string;
  icon: IconType;
  label: string;
  description: string;
}>;

const application_icons = [FaHouse, FaHandshakeSimple];

export default async function SidebarFooterApplications() {
  const t = await getTranslations("admin.page.sidebar.footer");

  const application: TApplication = t
    .raw("application.links")
    .map((link: object, index: number) => ({
      ...link,
      icon: application_icons[index],
    }));

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="data-[state=open]:bg-sidebar-accent rounded"
          >
            <SidebarMenuButton size="lg">
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded border">
                <FaUserGear className="text-muted-foreground size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h2 className="truncate font-medium">{t("label")}</h2>
                <p className="text-muted-foreground">{t("description")}</p>
              </div>
              <LuChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={18}
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) space-y-1.5 rounded p-1.5"
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              {t("application.label")}
            </DropdownMenuLabel>
            {application.map((application, index) => (
              <DropdownMenuItem
                asChild
                key={index}
                className="block cursor-pointer rounded"
              >
                <Link href={application.href}>
                  <span className="flex items-center gap-2">
                    <span className="flex size-6 rounded border">
                      <application.icon className="m-auto size-3.5 shrink-0" />
                    </span>
                    <span>{application.label}</span>
                  </span>
                  <span className="text-muted-foreground">
                    {application.description}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
