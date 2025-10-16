"use client";

import { useTranslations } from "next-intl";
import useUser from "../../../_hooks/use-user";

import {
  LuBolt,
  LuBookOpen,
  LuChevronDown,
  LuLayers2,
  LuLogOut,
  LuPin,
  LuUserPen,
} from "react-icons/lu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

export default function Account() {
  const t = useTranslations("app.user.layout.header.account");
  const user = useUser();

  if (user === undefined)
    return (
      <Button asChild>
        <Link href="/user/authentication/signin">{t("not-signed-in")}</Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto border hover:bg-transparent">
          <Avatar className="rounded-md h-full">
            <AvatarImage
              src="/origin/avatar.jpg"
              alt="Profile image"
              className="rounded-none"
            />
            <AvatarFallback className="rounded-none">{user.email}</AvatarFallback>
          </Avatar>
          <LuChevronDown size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            Keith Kennedy
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            k.kennedy@coss.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LuBolt size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LuLayers2 size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LuBookOpen size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LuPin size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LuUserPen size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LuLogOut size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
