import {
  LuBadgeCheck,
  LuBell,
  LuChevronsUpDown,
  LuCreditCard,
  LuLogOut,
  LuSparkles,
} from "react-icons/lu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";

export default function SidebarHeaderProfile() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="data-[state=open]:bg-sidebar-accent rounded"
          >
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded">aLr</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">alramadi</span>
                <span className="truncate text-xs">alramadi@vheexa.com</span>
              </div>
              <LuChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) rounded"
            align="start"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">alramadi</span>
                  <span className="truncate text-xs">alramadi@vheexa.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer rounded">
                <LuSparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer rounded">
                <LuBadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded">
                <LuCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded">
                <LuBell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-destructive/25 focus:text-destructive cursor-pointer rounded">
              <LuLogOut className="focus:text-destructive" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
