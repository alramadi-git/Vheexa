"use client";

import { useRouter } from "@/i18n/navigation";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { eMemberStatusModel, tMemberModel } from "@/models/partner/member";

import { ClsDateFormatter } from "@/libraries/date-formatter";
import { ClsMemberService } from "@/services/partner/member";

import { Toast } from "@/components/locals/blocks/toasts";
import { toast } from "sonner";

import {
  LuShieldAlert,
  LuShieldX,
  LuCheck,
  LuUser,
  LuUsers,
  LuCircleCheck,
  LuCircleX,
  LuEllipsisVertical,
  LuBookOpenText,
  LuPenLine,
  LuTrash2,
  LuUserSearch,
  LuUserX,
  LuShield,
  LuBuilding,
  LuHash,
  LuCalendar,
  LuSettings,
} from "react-icons/lu";

import BlockTable from "@/components/locals/partner/dashboard/blocks/table";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/shadcn/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

import { Badge } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";

import { Skeleton } from "@/components/shadcn/skeleton";

type tTableProps = {
  isLoading: boolean;
  isSuccess: boolean;
  data: tMemberModel[];
};
export default function Table({ isLoading, isSuccess, data }: tTableProps) {
  const locale = useLocale() as eLocale;
  const clsDateFormatter = new ClsDateFormatter(locale);

  const tTable = useTranslations(
    "app.partner.dashboard.members.page.members.table",
  );

  return (
    <BlockTable<tMemberModel>
      isLoading={isLoading}
      loadingRender={<Loading />}
      isSuccess={isSuccess}
      errorRender={<Error />}
      data={data}
      header={
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuHash className="size-4" />
                {tTable("uuid.header")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuUser className="size-4" />
                {tTable("member.header")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuShield className="size-4" />
                {tTable("role.header")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuBuilding className="size-4" />
                {tTable("branch.header")}
              </div>
            </TableHead>
            <TableHead>{tTable("status.header")}</TableHead>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuCalendar className="size-4" />
                {tTable("updated-at.header")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1.5">
                <LuCalendar className="size-4" />
                {tTable("created-at.header")}
              </div>
            </TableHead>
            <TableHead className="text-end">
              {tTable("actions.header")}
            </TableHead>
          </TableRow>
        </TableHeader>
      }
      emptyRender={<Empty />}
      bodyRowRender={(item) => (
        <TableRow key={item.uuid}>
          <TableCell>
            <Badge variant="muted">{item.uuid.slice(0, 8)}</Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-1.5">
              <Avatar className="bg-sidebar size-9">
                <AvatarFallback>
                  {item.username
                    .split(" ")
                    .map((n) => n[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
                <AvatarImage src={item.avatar?.url} alt={item.username} />
              </Avatar>
              <div>
                <p>{item.username}</p>
                <p className="text-muted-foreground text-xs">{item.email}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="info" className="flex items-center gap-1.5">
              {item.role.name}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1.5">
              <div>
                <p>{item.branch.name}</p>
                <p className="text-muted-foreground text-xs">
                  {item.branch.country},{item.branch.city},{item.branch.street}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant={
                item.status === eMemberStatusModel.active ? "success" : "muted"
              }
              className="flex items-center gap-1"
            >
              {item.status === eMemberStatusModel.active ? (
                <LuCircleCheck />
              ) : (
                <LuCircleX />
              )}
              {tTable("status.cell", {
                status: item.status,
              })}
            </Badge>
          </TableCell>
          <TableCell>
            {clsDateFormatter.format(new Date(item.updatedAt))}
          </TableCell>
          <TableCell>
            {clsDateFormatter.format(new Date(item.createdAt))}
          </TableCell>
          <TableCell>
            <div className="flex justify-end">
              <Actions member={item} />
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
}

function Loading() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="block h-8 w-full" />
      </TableCell>
    </TableRow>
  );
}

function Empty() {
  const tEmpty = useTranslations(
    "app.partner.dashboard.members.page.members.table.when-empty",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <LuUserSearch size={32} />
          <h3 className="text-lg">{tEmpty("title")}</h3>
          <p className="text-muted-foreground">{tEmpty("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
function Error() {
  const tError = useTranslations(
    "app.partner.dashboard.members.page.members.table.when-error",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <LuUserX size={32} />
          <h3 className="text-lg">{tError("title")}</h3>
          <p className="text-muted-foreground">{tError("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

type tActionsProps = {
  member: tMemberModel;
};
function Actions({ member }: tActionsProps) {
  const router = useRouter();
  const clsMemberService = new ClsMemberService();

  const tAction = useTranslations(
    "app.partner.dashboard.members.page.members.table.actions.cell",
  );

  function view() {
    toast.custom(() => <Toast variant="info" label={tAction("view.info")} />);
  }
  function edit() {
    toast.custom(() => <Toast variant="info" label={tAction("edit.info")} />);
  }
  async function remove() {
    const result = await clsMemberService.deleteOneAsync(member.uuid);

    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAction("remove.toasts.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast
        variant="success"
        label={tAction("remove.toasts.when-success")}
      ></Toast>
    ));
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LuEllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button className="size-full" onClick={() => view()}>
            <LuBookOpenText />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="size-full text-sky-500! hover:bg-sky-500/10!"
            onClick={() => edit()}
          >
            <LuPenLine className="text-sky-500" />
            {tAction("edit.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <button className="size-full" onClick={() => remove()}>
            <LuTrash2 />
            {tAction("remove.label")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
