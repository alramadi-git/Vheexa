"use client";

import { tHumanModel } from "@/models/human";
import { ReactNode, ComponentProps, Fragment } from "react";

import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";

import { LuUserRound, LuLogOut } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

type tNavigationMenuItem = {
  url: string;
  icon?: ReactNode;
  label: string;
};

type tAuthenticatedAccountProps = {
  isAuthenticated: true;
  authenticated: {
    account: tHumanModel;
    logout: () => void;
    navigationMenu: tNavigationMenuItem[][];
    props?: ComponentProps<typeof DropdownMenuContent>;
  };
};

type tUnauthenticatedAccountProps = {
  isAuthenticated: false;
  unauthenticatedReactNode: ReactNode;
};

type tAccountProps = tAuthenticatedAccountProps | tUnauthenticatedAccountProps;

export default function Account(props: tAccountProps) {
  const tAccount = useTranslations("components.account");

  const { isAuthenticated } = props;
  if (isAuthenticated === false) return props.unauthenticatedReactNode;

  const {
    account,
    logout,
    navigationMenu,
    props: dropdownMenuContentProps,
  } = props.authenticated;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="border p-2.5 hover:bg-transparent">
          <Avatar className="size-6 items-center justify-center rounded-sm">
            <AvatarImage
              src={account.avatar?.url}
              alt={account.username}
              className="rounded-sm bg-transparent"
            />
            <AvatarFallback className="rounded-sm bg-transparent">
              <LuUserRound className="opacity-60" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        {...dropdownMenuContentProps}
        className={cn("max-w-64", dropdownMenuContentProps?.className)}
      >
        <DropdownMenuLabel className="flex min-w-0">
          <p className="text-foreground flex flex-col text-sm font-medium">
            {account.username}
            <span className="text-muted-foreground truncate text-xs font-normal">
              {account.email}
            </span>
          </p>
        </DropdownMenuLabel>

        {navigationMenu.map((item, index) => (
          <Fragment key={index}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {item.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </Fragment>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive" onClick={logout}>
          <button className="w-full">
            <LuLogOut size={16} aria-hidden="true" />
            <span>{tAccount("logout")}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
