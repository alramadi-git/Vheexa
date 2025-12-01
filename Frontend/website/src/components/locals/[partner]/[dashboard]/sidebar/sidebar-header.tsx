"use client";

import { useTranslations } from "next-intl";
import { useAccount } from "@/hooks/[partner]/use-account";

import {
  LuChevronsUpDown,
  LuUser,
  LuBadgeCheck,
  LuBell,
  LuLogOut,
} from "react-icons/lu";

import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";
import { Link } from "@/components/locals/blocks/link";
import { Skeleton } from "@/components/shadcn/skeleton";

type tLink = {
  url: string;
  label: string;
};

const icons = [LuBadgeCheck({}), LuBell({})];

export default function SidebarHeader() {
  return (
    <ShadcnSidebarHeader>
      <SidebarAccount />
    </ShadcnSidebarHeader>
  );
}

function SidebarAccount() {
  const tGlobalAccount = useTranslations("components.account");
  const tAccount = useTranslations(
    "app.admin.dashboard.layout.sidebar.header.account",
  );

  const navigationMenu: tLink[] = tAccount.raw("navigation-menu");

  const { account } = useAccount();
  if (account === null)
    return (
      <div className="flex items-center gap-2 rounded-sm border p-2">
        <Skeleton className="h-10 w-12" />
        <div className="w-full space-y-2">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent border"
        >
          <Avatar className="size-8 rounded-sm bg-transparent">
            <AvatarImage src={account.avatar?.url} alt={account.username} />
            <AvatarFallback className="size-full rounded-sm bg-transparent">
              <LuUser size={20} />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{account.username}</span>
            <span className="truncate text-xs">{account.email}</span>
          </div>
          <LuChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={6}
        side="bottom"
        className="bg-sidebar w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm border p-1"
      >
        <DropdownMenuLabel>
          <p className="truncate font-medium">{account.username}</p>
          <p className="truncate text-xs font-normal">{account.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigationMenu.map((item, index) => (
            <DropdownMenuItem asChild key={index} className="rounded-sm">
              <Link href={item.url} className="w-full">
                {icons[index]}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive" className="rounded-sm">
          <button className="w-full">
            <LuLogOut />
            {tGlobalAccount("logout")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
