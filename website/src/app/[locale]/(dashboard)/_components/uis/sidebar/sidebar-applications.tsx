import type { IconType } from "react-icons/lib";

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

type TSidebarApplication = {
  icon: IconType;
  label: string;
  description: string;

  applications: Array<TApplication>;
};

type TApplication = {
  href: string;
  icon: IconType;
  label: string;
  description: string;
};

export default async function SidebarApplications(props: TSidebarApplication) {
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
                <props.icon className="text-muted-foreground size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h3 className="line-clamp-1 truncate font-medium">
                  {props.label}
                </h3>
                <p className="text-muted-foreground line-clamp-1">
                  {props.description}
                </p>
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
              Applications
            </DropdownMenuLabel>
            {props.applications.map((application, index) => (
              <DropdownMenuItem
                asChild
                key={index}
                className="block cursor-pointer rounded"
              >
                <Link href={application.href}>
                  <span className="flex items-center gap-2">
                    <application.icon className="size-6 rounded border p-1" />
                    <h3>{application.label}</h3>
                  </span>
                  <p className="text-muted-foreground">
                    {application.description}
                  </p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
