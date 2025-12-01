import { IconType } from "react-icons/lib";
import { LuChevronsUpDown } from "react-icons/lu";

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
import { Link } from "@/components/locals/blocks/link";

type tSidebarProps = {
  icon: IconType;
  label: string;
  description: string;

  applications: tNavigationMenu[];
};

type tNavigationMenu = {
  href: string;
  icon: IconType;
  label: string;
  description: string;
};

export default async function Sidebar(props: tSidebarProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="data-[state=open]:bg-sidebar-accent block rounded"
          >
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-2">
                <props.icon className="text-muted-foreground size-4" />
                <h3 className="line-clamp-1 truncate font-medium">
                  {props.label}
                </h3>
              </div>
              <p className="text-muted-foreground line-clamp-1 text-sm leading-tight">
                {props.description}
              </p>
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
                className="block cursor-pointer space-y-0.5 rounded p-2"
              >
                <Link href={application.href}>
                  <span className="flex items-center gap-2">
                    <application.icon className="text-muted-foreground size-4" />
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
