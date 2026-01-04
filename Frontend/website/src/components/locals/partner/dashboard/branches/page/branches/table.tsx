"use client";

import { eLocale } from "@/i18n/routing";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import { parsePhoneNumberFromString } from "libphonenumber-js";

import { eBranchStatusModel, tBranchModel } from "@/models/partner/branch";
import { ClsBranchService } from "@/services/partner/branch";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import { GiAncientRuins, GiIsland } from "react-icons/gi";
import {
  LuUser,
  LuUsers,
  LuCar,
  LuCircleCheck,
  LuCircleX,
  LuEllipsisVertical,
  LuBookOpenText,
  LuPenLine,
  LuTrash2,
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

import { Badge } from "@/components/locals/blocks/typography";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

import { Skeleton } from "@/components/shadcn/skeleton";
import { useState } from "react";

type tTableProps = {
  isLoading: boolean;
  isSuccess: boolean;
  data: tBranchModel[];
};
export default function Table({ isLoading, isSuccess, data }: tTableProps) {
  const locale = useLocale() as eLocale;
  const clsDateFormatter = new ClsDateFormatter(locale);

  const tTable = useTranslations(
    "app.partner.dashboard.branches.page.branches.table",
  );

  return (
    <BlockTable<tBranchModel>
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      header={
        <TableHeader>
          <TableRow>
            <TableHead>{tTable("uuid.header")}</TableHead>
            <TableHead>{tTable("name.header")}</TableHead>
            <TableHead>{tTable("location.header")}</TableHead>
            <TableHead>{tTable("members.header")}</TableHead>
            <TableHead>{tTable("vehicles.header")}</TableHead>
            <TableHead>{tTable("contacts.header")}</TableHead>
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
            <span className="flex flex-col">
              {item.country}, {item.city}
              <span className="text-muted-foreground">{item.street}</span>
            </span>
          </TableCell>
          <TableCell>
            <span className="flex items-center gap-1">
              {tTable.rich("members.cell", {
                count: item.memberCount,
                user: () => <LuUser size={16} />,
                users: () => <LuUsers size={16} />,
              })}
            </span>
          </TableCell>
          <TableCell>
            <span className="flex items-center gap-1">
              <LuCar size={16} />
              {tTable.rich("vehicles.cell", {
                count: item.memberCount,
              })}
            </span>
          </TableCell>
          <TableCell>
            <Contacts phoneNumber={item.phoneNumber} email={item.email} />
          </TableCell>
          <TableCell>
            <Badge
              variant={
                item.status === eBranchStatusModel.active ? "success" : "muted"
              }
              className="flex items-center gap-1"
            >
              {item.status === eBranchStatusModel.active ? (
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
              <Actions branch={item} />
            </div>
          </TableCell>
        </TableRow>
      )}
      loadingRender={<Loading />}
      errorRender={<Error />}
      emptyRender={<Empty />}
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
    "app.partner.dashboard.branches.page.branches.table.when-empty",
  );

  return (
    <TableRow>
      <TableCell colSpan={10} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <GiAncientRuins size={32} />
          <h3 className="text-lg">{tEmpty("title")}</h3>
          <p className="text-muted-foreground">{tEmpty("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
function Error() {
  const tError = useTranslations(
    "app.partner.dashboard.branches.page.branches.table.when-error",
  );

  return (
    <TableRow>
      <TableCell colSpan={10} className="py-12">
        <div className="flex flex-col items-center gap-3">
          <GiIsland size={32} />
          <h3 className="text-lg">{tError("title")}</h3>
          <p className="text-muted-foreground">{tError("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

type tContactsProps = {
  phoneNumber: string;
  email: string;
};
function Contacts({ phoneNumber, email }: tContactsProps) {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);

  return (
    <div className="flex flex-col">
      <Link href={`tel:${phoneNumber}`} className="w-fit hover:underline">
        {parsedPhoneNumber?.formatNational()}
      </Link>
      <Link
        href={`mailto:${email}`}
        className="text-muted-foreground w-fit text-xs hover:underline"
      >
        {email}
      </Link>
    </div>
  );
}

type tActionsProps = {
  branch: tBranchModel;
};
function Actions({ branch }: tActionsProps) {
  const router = useRouter();

  const clsBranchService = new ClsBranchService();

  const tAction = useTranslations(
    "app.partner.dashboard.branches.page.branches.table.actions.cell",
  );

  function view() {
    toast.custom(() => <Toast variant="info" label={tAction("view.info")} />);
  }
  function edit() {
    toast.custom(() => <Toast variant="info" label={tAction("edit.info")} />);
  }

  async function remove() {
    const result = await clsBranchService.deleteOneAsync(branch.uuid);

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
        <Button type="button" variant="ghost" size="icon">
          <LuEllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button type="button" className="size-full" onClick={() => view()}>
            <LuBookOpenText size={16} />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="size-full text-sky-500! hover:bg-sky-500/10!"
            onClick={() => edit()}
          >
            <LuPenLine size={16} className="text-sky-500" />
            {tAction("edit.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <button type="button" className="size-full" onClick={() => remove()}>
            <LuTrash2 />
            {tAction("remove.label")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
