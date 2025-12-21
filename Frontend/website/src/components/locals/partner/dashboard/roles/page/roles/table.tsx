"use client";

import { useLocale, useTranslations } from "next-intl";

import { ePageSize } from "@/validations/pagination";

import { eRoleStatusModel, tRoleModel } from "@/models/partner/role";

import BlockTable from "@/components/locals/partner/dashboard/blocks/table";

import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Badge, Toast } from "@/components/locals/blocks/typography";
import {
  LuBookOpenText,
  LuCircleCheck,
  LuCircleX,
  LuEllipsisVertical,
  LuPenLine,
  LuShield,
  LuTrash2,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import { ClsDateFormatter } from "@/libraries/date-formatter";
import { eLocale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { ClsRoleService } from "@/services/partner/role";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

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
    <BlockTable
      isLoading={isLoading}
      loadingRowCount={ePageSize.ten}
      loadingRender={<Loading />}
      isSuccess={isSuccess}
      data={data}
      header={
        <TableHeader>
          <TableRow>
            <TableHead>{tTable("uuid.header")}</TableHead>
            <TableHead>{tTable("role-name.header")}</TableHead>
            <TableHead>{tTable("permissions.header")}</TableHead>
            <TableHead>{tTable("members.header")}</TableHead>
            <TableHead>{tTable("status.header")}</TableHead>
            <TableHead>{tTable("updated-at.header")}</TableHead>
            <TableHead>{tTable("created-at.header")}</TableHead>
            <TableHead>{tTable("actions.header")}</TableHead>
          </TableRow>
        </TableHeader>
      }
      bodyRow={(item) => (
        <TableRow key={item.uuid}>
          <TableCell>
            <Badge variant="muted">{item.uuid.slice(0, 8)}</Badge>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.permissions.length}</TableCell>
          <TableCell>
            <div className="flex items-center gap-1.5">
              {tTable.rich("members.cell", {
                count: item.assignedCount - 2,
                users: () => <LuUsers size={16} />,
                user: () => <LuUser size={16} />,
              })}
            </div>
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
            <Actions role={item} />
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

type tActionsProps = {
  role: tRoleModel;
};
function Actions({ role }: tActionsProps) {
  const clsRoleService = new ClsRoleService();
  const router = useRouter();

  const tAction = useTranslations(
    "app.partner.dashboard.roles.page.roles.table.actions.cell",
  );

  function view() {
    toast.custom(() => (
      <Toast variant="info" label={tAction("view.content")} />
    ));
  }
  function edit() {
    toast.custom(() => (
      <Toast variant="info" label={tAction("edit.content")} />
    ));
  }
  async function remove() {
    const result = await clsRoleService.deleteOneAsync(role.uuid);
    console.log("result: ", result);

    if (result.isSuccess) {
      toast.custom(() => (
        <Toast variant="success" label={tAction("remove.when-success")}></Toast>
      ));
      router.refresh();
    } else {
      toast.custom(() => (
        <Toast variant="destructive" label={tAction("remove.when-error")} />
      ));
    }
  }

  return (
    <DropdownMenu>
      <div className="flex w-full">
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="View, edit and delete"
            variant="ghost"
            size="icon"
            className="mx-auto"
          >
            <LuEllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button className="size-full" onClick={() => view()}>
            <LuBookOpenText />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="size-full text-blue-500! hover:bg-blue-500/10!"
            onClick={() => edit()}
          >
            <LuPenLine className="text-blue-500" />
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
