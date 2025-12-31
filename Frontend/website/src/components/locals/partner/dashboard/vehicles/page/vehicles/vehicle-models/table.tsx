"use client";

import { eLocale } from "@/i18n/routing";

import {
  eVehicleModelStatusModel,
  tVehicleModelModel,
} from "@/models/partner/vehicle-model";

import { toast } from "sonner";

import { eCurrency, ClsMonyFormatter } from "@/libraries/mony-formatter";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import { ClsVehicleModelService } from "@/services/partner/vehicle-model";

import { cn } from "@/utilities/cn";

import {
  LuDot,
  LuUsers,
  LuActivity,
  LuFuel,
  LuEllipsisVertical,
  LuBookOpenText,
  LuPenLine,
  LuTrash2,
  LuCircleCheck,
  LuCircleX,
} from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";

import BlockTable from "@/components/locals/partner/dashboard/blocks/table";
import {
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/shadcn/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";

import { Badge, Toast } from "@/components/locals/blocks/typography";
import { Badge as ShadcnBadge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";

type tVehicleModelsProps = {
  isLoading: boolean;
  isSuccess: boolean;
  data: tVehicleModelModel[];
};

export default function Table({
  isLoading,
  isSuccess,
  data,
}: tVehicleModelsProps) {
  const locale = useLocale() as eLocale;

  const clsDateFormatter = new ClsDateFormatter(locale);
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const tTable = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.table",
  );

  return (
    <BlockTable<tVehicleModelModel>
      isLoading={isLoading}
      loadingRender={<Loading />}
      isSuccess={isSuccess}
      errorRender={<Error />}
      data={data}
      header={
        <TableHeader>
          <TableRow>
            <TableHead>{tTable("uuid.header")}</TableHead>
            <TableHead>{tTable("vehicle-model.header")}</TableHead>
            <TableHead>{tTable("specifications.header")}</TableHead>
            <TableHead>{tTable("colors.header")}</TableHead>
            <TableHead>{tTable("price.header")}</TableHead>
            <TableHead>{tTable("discount.header")}</TableHead>
            <TableHead>{tTable("status.header")}</TableHead>
            <TableHead>{tTable("updated-at.header")}</TableHead>
            <TableHead>{tTable("created-at.header")}</TableHead>
            <TableHead className="text-end">
              {tTable("actions.header")}
            </TableHead>
          </TableRow>
        </TableHeader>
      }
      emptyRender={<Empty />}
      bodyRowRender={(vehicleModel) => (
        <TableRow key={vehicleModel.uuid}>
          <TableCell>
            <Badge variant="muted">{vehicleModel.uuid.slice(0, 8)}</Badge>
          </TableCell>
          <TableCell className="max-w-96">
            <div>
              <span className="flex items-center gap-3">
                <ShadcnBadge variant="outline">
                  {vehicleModel.manufacturer}
                </ShadcnBadge>
                <h3 className="text-base">
                  {vehicleModel.name}{" "}
                  {new Date(vehicleModel.marketLaunch).getFullYear()}
                </h3>
              </span>
              <p className="text-muted-foreground truncate">
                {vehicleModel.description}
              </p>
            </div>
          </TableCell>
          <TableCell>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <LuUsers size={16} />
                  {tTable("specifications.cell.capacity", {
                    capacity: vehicleModel.capacity,
                  })}
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <LuDot size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <LuActivity size={16} />
                  {vehicleModel.transmission}
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <LuDot size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <LuFuel size={16} />
                  {vehicleModel.fuel}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </TableCell>
          <TableCell>
            <ul className="flex gap-1.5">
              {vehicleModel.colors.map((color) => (
                <li
                  key={color.uuid}
                  style={{
                    background: `color-mix(in oklab, ${color.hexCode} 20%, transparent)`,
                    color: color.hexCode,
                  }}
                  className="flex items-center justify-center rounded p-1 text-xs font-medium"
                >
                  {color.name.split(" ").map((chunk) => chunk.at(0))}
                </li>
              ))}
            </ul>
          </TableCell>
          <TableCell>
            {vehicleModel.discount === 0 ? (
              <span>
                {tTable.rich("price.cell", {
                  price: clsMonyFormatter.format(
                    vehicleModel.price - vehicleModel.discount,
                  ),
                  span: (chunk) => (
                    <span className="text-muted-foreground text-xs">
                      {chunk}
                    </span>
                  ),
                })}
              </span>
            ) : (
              <span className="flex flex-col">
                <del className="text-muted-foreground">
                  {clsMonyFormatter.format(vehicleModel.price)}
                </del>
                <ins className="no-underline">
                  {tTable.rich("price.cell", {
                    price: clsMonyFormatter.format(
                      vehicleModel.price - vehicleModel.discount,
                    ),
                    span: (chunk) => (
                      <span className="text-muted-foreground text-xs">
                        {chunk}
                      </span>
                    ),
                  })}
                </ins>
              </span>
            )}
          </TableCell>
          <TableCell>
            <span
              className={cn("inline-flex w-full items-center gap-1", {
                "text-blue-500": vehicleModel.discount === 0,
                "text-emerald-500": vehicleModel.discount !== 0,
              })}
            >
              {clsMonyFormatter.format(vehicleModel.discount)}
              <MdOutlineDiscount size={16} />
            </span>
          </TableCell>
          <TableCell>
            <Badge
              variant={
                vehicleModel.status === eVehicleModelStatusModel.active
                  ? "success"
                  : "muted"
              }
              className="flex items-center gap-1"
            >
              {vehicleModel.status === eVehicleModelStatusModel.active ? (
                <LuCircleCheck />
              ) : (
                <LuCircleX />
              )}
              {tTable("status.cell", {
                status: vehicleModel.status,
              })}
            </Badge>
          </TableCell>
          <TableCell>
            {clsDateFormatter.format(new Date(vehicleModel.updatedAt))}
          </TableCell>
          <TableCell>
            {clsDateFormatter.format(new Date(vehicleModel.createdAt))}
          </TableCell>
          <TableCell>
            <Actions vehicleModel={vehicleModel} />
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
    "app.partner.dashboard.vehicles.page.vehicle-models.content.table.when-empty",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          {/* <LuShieldAlert size={32} /> */}
          <h3 className="text-lg">{tEmpty("title")}</h3>
          <p className="text-muted-foreground">{tEmpty("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
function Error() {
  const tError = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicle-models.content.table.when-error",
  );

  return (
    <TableRow>
      <TableCell colSpan={8} className="py-12">
        <div className="flex flex-col items-center gap-3">
          {/* <LuShieldX size={32} /> */}
          <h3 className="text-lg">{tError("title")}</h3>
          <p className="text-muted-foreground">{tError("description")}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

type tActionsProps = {
  vehicleModel: tVehicleModelModel;
};
function Actions({ vehicleModel }: tActionsProps) {
  const router = useRouter();

  const clsVehicleModelService = new ClsVehicleModelService();

  const tAction = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.table.actions.cell",
  );

  function view() {
    toast.custom(() => <Toast variant="info" label={tAction("view.info")} />);
  }
  function edit() {
    toast.custom(() => <Toast variant="info" label={tAction("edit.info")} />);
  }
  async function remove() {
    const result = await clsVehicleModelService.deleteOneAsync(
      vehicleModel.uuid,
    );

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
      <div className="flex w-full">
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="View, edit and delete"
            variant="ghost"
            size="icon"
            className="ms-auto"
          >
            <LuEllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button className="size-full" onClick={() => view()}>
            <LuBookOpenText size={16} />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="size-full text-blue-500! hover:bg-blue-500/10!"
            onClick={() => edit()}
          >
            <LuPenLine size={16} className="text-blue-500" />
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
