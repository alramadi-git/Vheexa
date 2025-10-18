"use client";

import { useTranslations } from "next-intl";
import useUser from "../../../_hooks/use-user";

import { LuUserRound, LuChevronDown, LuBolt, LuLogOut } from "react-icons/lu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

export default function Account() {
  const t = useTranslations("app.user.layout.header.account");
  const { user, logout } = useUser();

  if (user === undefined)
    return (
      <Button asChild>
        <Link href="/user/authentication/signin">{t("not-signed-in")}</Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border hover:bg-transparent">
          <Avatar className="size-6 items-center justify-center rounded-md">
            <AvatarImage
              // src={user.avatar?.url}
              alt={user.email}
              className="rounded-md bg-transparent"
            />
            <AvatarFallback className="rounded-md bg-transparent">
              <LuUserRound className="opacity-60" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
          <LuChevronDown size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user.username}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/user/profile">
              <LuBolt size={16} className="opacity-60" aria-hidden="true" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={logout} variant="destructive">
          <button className="w-full">
            <LuLogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
