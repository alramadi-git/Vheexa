"use client";

import { useTranslations } from "next-intl";

import useAccount from "@/hooks/partner/account";

import {
  LuChevronsUpDown,
  LuUser,
  LuLogOut,
} from "react-icons/lu";

import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";

import { Skeleton } from "@/components/shadcn/skeleton";

export default function SidebarHeader() {
  return (
    <ShadcnSidebarHeader>
      <SidebarAccount />
    </ShadcnSidebarHeader>
  );
}

function SidebarAccount() {
  const { account, logout } = useAccount();
  const tComponentsAccount = useTranslations("components.account");

  if (account === null) {
    return (
      <div className="flex items-center gap-2 p-2">
        <Skeleton className="h-10 w-12" />
        <div className="w-full space-y-2">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent items-end"
        >
          <Avatar className="size-8 bg-transparent">
            <AvatarImage src={account.avatar ?? undefined} alt={account.username} />
            <AvatarFallback>
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
        className="bg-sidebar w-(--radix-dropdown-menu-trigger-width) min-w-56 border p-1"
      >
        <DropdownMenuLabel>
          <p className="truncate font-medium">{account.username}</p>
          <p className="truncate text-xs font-normal">{account.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive">
          <button className="w-full" onClick={logout}>
            <LuLogOut />
            {tComponentsAccount("logout")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
