"use client";

import { useTranslations } from "next-intl";

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
import { Badge } from "@/components/locals/blocks/typography";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

type tTableProps = {
  isLoading: boolean;
  isSuccess: boolean;
  data: tRoleModel[];
};
export default function Table({ isLoading, isSuccess, data }: tTableProps) {
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
          <TableCell>{item.assignedCount}</TableCell>
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
          <TableCell>{item.updatedAt}</TableCell>
          <TableCell>{item.createdAt}</TableCell>
          <TableCell>:</TableCell>
        </TableRow>
      )}
    />
    // <ShadcnTable>

    // <TableBody>
    //   {/* <TableRow>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //     <TableCell className="h-12">
    //       <Skeleton className="size-full" />
    //     </TableCell>
    //   </TableRow> */}
    //   <TableRow>
    //     <TableCell colSpan={8}>Something went wrong</TableCell>
    //   </TableRow>
    // </TableBody>
    // </ShadcnTable>
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
