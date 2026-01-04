"use client";

import { useRouter } from "@/i18n/navigation";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { eRoleStatusModel, tRoleModel } from "@/models/partner/role";

import BlockTable from "@/components/locals/partner/dashboard/blocks/table";

import { ClsDateFormatter } from "@/libraries/date-formatter";
import { ClsRoleService } from "@/services/partner/role";

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
} from "react-icons/lu";

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

import { Skeleton } from "@/components/shadcn/skeleton";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/locals/blocks/typography";
import { Toast } from "@/components/locals/blocks/toasts";
import { useState } from "react";

type tTableProps = {
  isLoading: boolean;
  isSuccess: boolean;
  data: tRoleModel[];
};
export default function Table({ isLoading, isSuccess, data }: tTableProps) {
  const locale = useLocale() as eLocale;
  const clsDateFormatter = new ClsDateFormatter(locale);

  const tTable = useTranslations(
    "app.partner.dashboard.roles.page.roles.table",
  );

  return (
    <BlockTable<tRoleModel>
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      header={
        <TableHeader>
          <TableRow>
            <TableHead>{tTable("uuid.header")}</TableHead>
            <TableHead>{tTable("role-name.header")}</TableHead>
            <TableHead className="w-79">
              {tTable("permissions.header")}
            </TableHead>
            <TableHead>{tTable("members.header")}</TableHead>
            <TableHead>{tTable("status.header")}</TableHead>
            <TableHead>{tTable("updated-at.header")}</TableHead>
            <TableHead>{tTable("created-at.header")}</TableHead>
            <TableHead className="text-end">
              {tTable("actions.header")}
            </TableHead>
          </TableRow>
        </TableHeader>
      }
      bodyRowRender={(item) => (
        <TableRow key={item.uuid}>
          <TableCell>
            <Badge variant="muted">{item.uuid.slice(0, 8)}</Badge>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>
            <Permissions permissions={item.permissions} />
          </TableCell>
          <TableCell>
            <span className="flex items-center gap-1.5">
              {tTable.rich("members.cell", {
                count: item.assignedCount,
                user: () => <LuUser size={16} />,
                users: () => <LuUsers size={16} />,
              })}
            </span>
          </TableCell>
          <TableCell>
            <Badge
              variant={
                item.status === eRoleStatusModel.active ? "success" : "muted"
              }
              className="flex items-center gap-1"
            >
              {item.status === eRoleStatusModel.active ? (
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
              <Actions role={item} />
            </div>
          </TableCell>
        </TableRow>
      )}
      loadingRender={<Loading />}
      emptyRender={<Empty />}
      errorRender={<Error />}
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
    "app.partner.dashboard.roles.page.roles.table.when-empty",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <LuShieldAlert size={32} />
          <h3 className="text-lg">{tEmpty("title")}</h3>
          <p className="text-muted-foreground">{tEmpty("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
function Error() {
  const tError = useTranslations(
    "app.partner.dashboard.roles.page.roles.table.when-error",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <LuShieldX size={32} />
          <h3 className="text-lg">{tError("title")}</h3>
          <p className="text-muted-foreground">{tError("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

type tPermissionProps = {
  permissions: tRoleModel["permissions"];
};
function Permissions({ permissions }: tPermissionProps) {
  const tPermissions = useTranslations(
    "app.partner.dashboard.roles.page.roles.table.permissions",
  );

  const visiblePermissions = permissions.slice(0, 3);
  const remainingPermissions = permissions.length - visiblePermissions.length;

  return (
    <ul className="flex flex-wrap items-center gap-1">
      {visiblePermissions.map((permission) => (
        <li key={permission.uuid}>
          <Badge variant="muted" className="flex items-center gap-1">
            <LuCheck size={16} />
            {permission.name}
          </Badge>
        </li>
      ))}
      {remainingPermissions > 0 && (
        <li>
          <Badge variant="muted" className="flex items-center gap-1">
            {tPermissions("cell", {
              count: remainingPermissions,
            })}
          </Badge>
        </li>
      )}
    </ul>
  );
}

type tActionsProps = {
  role: tRoleModel;
};
function Actions({ role }: tActionsProps) {
  const router = useRouter();

  const tAction = useTranslations(
    "app.partner.dashboard.roles.page.roles.table.actions.cell",
  );

  const clsRoleService = new ClsRoleService();

  function view() {
    toast.custom(() => <Toast variant="info" label={tAction("view.info")} />);
  }
  function edit() {
    toast.custom(() => <Toast variant="info" label={tAction("edit.info")} />);
  }

  async function remove() {
    const result = await clsRoleService.deleteOneAsync(role.uuid);

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
          <button type="button" className="size-full" onClick={() => view()}>
            <LuBookOpenText />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="size-full text-sky-500! hover:bg-sky-500/10!"
            onClick={() => edit()}
          >
            <LuPenLine className="text-sky-500" />
            {tAction("edit.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive">
          <button type="button" className="size-full" onClick={() => remove()}>
            <LuTrash2 />
            {tAction("remove.label")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
