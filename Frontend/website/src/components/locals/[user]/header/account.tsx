"use client";

import { type ComponentProps } from "react";

import { useTranslations } from "next-intl";
import useAccount from "@/hooks/[user]/use-account";

import { LuUserRound } from "react-icons/lu";

import {

  DropdownMenuContent,
 
} from "@/components/shadcn/dropdown-menu";


import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

import BlockAccount from "../../blocks/account";

type tAccountProps = ComponentProps<typeof DropdownMenuContent>;

type tNavigationMenuItem = {
  url: string;
  label: string;
};

const icons = [
  [
    LuUserRound({
      "aria-hidden": "true",
      size: 16,
      className: "opacity-60",
    }),
  ],
];

export default function Account(props: tAccountProps) {
  const { account, logout } = useAccount();
  const tAccount = useTranslations("app.user.layout.header.account");

  if (account === null) {
    return (
      <BlockAccount
        isAuthenticated={false}
        unauthenticatedReactNode={
          <Button asChild className="max-md:grow">
            <Link href="/user/authentication/login">
              {tAccount("unauthenticated.login-now")}
            </Link>
          </Button>
        }
      />
    );
  }

  const navigationMenu: tNavigationMenuItem[][] = (
    tAccount.raw("authenticated.navigation-menu") as tNavigationMenuItem[][]
  ).map((group, groupIndex) =>
    group.map((item, index) => ({
      icon: icons[groupIndex][index],
      ...item,
    })),
  );

  return (
    <BlockAccount
      isAuthenticated={true}
      authenticated={{
        account,
        logout,
        navigationMenu,
        props,
      }}
    />
  );
}
