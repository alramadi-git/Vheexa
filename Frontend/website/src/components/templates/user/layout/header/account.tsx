"use client";

import { useTranslations } from "next-intl";

import useAccount from "@/user/hooks/account";

import { LuLogOut, LuUserRound } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

export default function Account() {
  const tAccount = useTranslations("app.user.layout.header.account");

  const account = useAccount();

  if (account === undefined) {
    return (
      <Button asChild className="max-md:grow">
        <Link href="/authentication/login">
          {tAccount("when-unauthenticated.login")}
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border p-2.5 hover:bg-transparent">
          <Avatar className="size-6 items-center justify-center rounded">
            <AvatarImage
              src={account.account.account.avatar?.url}
              alt={account.account.account.username}
              className="rounded bg-transparent"
            />
            <AvatarFallback className="rounded bg-transparent">
              <LuUserRound className="opacity-60" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <div>
          <p className="text-foreground text-sm font-medium">
            {account.account.account.username}
          </p>
          <p className="text-muted-foreground truncate text-xs font-normal">
            {account.account.account.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive" onClick={account.logout}>
          <button className="w-full">
            <LuLogOut className="size-4" />
            {tAccount("when-authenticated.logout")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
