"use client";

import { type ComponentProps } from "react";

import { useTranslations } from "next-intl";
import useAccount from "@/app/[locale]/user/_hooks/use-account";

import { LuBolt, LuUserRound, LuLogOut } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

type tAccountProps = {
  align?: ComponentProps<typeof DropdownMenuContent>["align"];
};

const icons = [LuBolt];

export default function Account({ align = "start" }: tAccountProps) {
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
        <Button variant="ghost" className="border p-2.5 hover:bg-transparent">
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
          {/* <LuChevronDown size={16} className="opacity-60" aria-hidden="true" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="max-w-64">
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
