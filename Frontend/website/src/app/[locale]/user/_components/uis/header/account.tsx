"use client";

import useAccount from "../../../_hooks/use-account";
import { useTranslations } from "next-intl";

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

const icons = [LuBolt];

export default function Account() {
  const { account, logout } = useAccount();
  const t = useTranslations("app.user.layout.header.account");

  if (account === undefined)
    return (
      <Button asChild>
        <Link href="/user/authentication/login">{t("not-logged-in")}</Link>
      </Button>
    );

  const navigation = (
    t.raw("logged-in.navigation") as {
      href: string;
      label: string;
    }[]
  ).map((item, index) => ({
    icon: icons[index],
    href: item.href,
    label: item.label,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border hover:bg-transparent">
          <Avatar className="size-6 items-center justify-center rounded-md">
            <AvatarImage
              src={account.avatar?.url}
              alt={account.email}
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
            {account.username}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {account.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigation.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href}>
                <item.icon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={logout} variant="destructive">
          <button className="w-full">
            <LuLogOut size={16} aria-hidden="true" />
            <span>{t("logged-in.logout")}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
