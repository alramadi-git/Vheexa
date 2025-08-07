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
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";

type TSidebarProfile = {
  name: string;
  email: string;
  image: {
    url: string;
    alternate: string;
  };
};

export default function SidebarProfile(props: TSidebarProfile) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            asChild
            size="lg"
            className="data-[state=open]:bg-sidebar-accent rounded"
          >
            <DropdownMenuTrigger>
              <Avatar className="size-8 rounded">
                <AvatarImage
                  src={props.image.url}
                  alt={props.image.alternate}
                />
                <AvatarFallback className="rounded">
                  {props.image.alternate}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h3 className="truncate font-medium">{props.name}</h3>
                <p className="truncate text-xs">{props.email}</p>
              </div>
              <LuChevronsUpDown className="ml-auto size-4" />
            </DropdownMenuTrigger>
          </SidebarMenuButton>
          <DropdownMenuContent
            sideOffset={6}
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) rounded"
          >
            <DropdownMenuLabel className="flex items-center gap-2 p-0 px-1 py-1.5 text-left text-sm font-normal">
              <Avatar className="size-8 rounded">
                <AvatarImage
                  src={props.image.url}
                  alt={props.image.alternate}
                />
                <AvatarFallback className="rounded">
                  {props.image.alternate}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h3 className="truncate font-medium">{props.name}</h3>
                <p className="truncate text-xs">{props.email}</p>
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
            <DropdownMenuItem className="focus:bg-destructive/10 focus:text-destructive text-destructive cursor-pointer rounded">
              <LuLogOut className="text-destructive" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
