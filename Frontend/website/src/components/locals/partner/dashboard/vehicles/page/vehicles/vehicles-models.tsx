"use client";
import { eLocale } from "@/i18n/routing";

import {
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
  eVehicleModelTransmissionModel,
  tVehicleModelModel,
} from "@/models/partner/vehicle-model";

import { eCurrency, ClsMonyFormatter } from "@/libraries/mony-formatter";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { cn } from "@/utilities/cn";

import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-model";

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
  LuPlus,
} from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TabsContent } from "@/components/shadcn/tabs";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/shadcn/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcn/dialog";
import { Badge as ShadcnBadge } from "@/components/shadcn/badge";
import { Badge } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";

import { Pagination } from "@/components/locals/blocks/pagination";
import {
  tVehicleModelCreate,
  zVehicleModelCreate,
} from "@/validations/partner/vehicle-model-create";
import { zodResolver } from "@hookform/resolvers/zod";

export default function VehicleModels() {
  const { isLoading, result } = useVehicleModels();
  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  const columns: ColumnDef<tVehicleModelModel>[] = useMemo(() => {
    return [
      {
        header: () => <Heading title={tVehicleModels("table.uuid.header")} />,
        accessorKey: "uuid",
        cell: (info) => (
          <Uuid uuid={info.getValue<tVehicleModelModel["uuid"]>()} />
        ),
      },
      {
        id: "vehicle-model",
        header: () => (
          <Heading
            title={tVehicleModels("table.vehicle-model.header")}
          ></Heading>
        ),
        accessorFn: (row) => ({
          name: row.name,
          description: row.description,
          manufacturer: row.manufacturer,
          modelYear: row.modelYear,
        }),

        cell: (info) => {
          const { name, description, modelYear, manufacturer } =
            info.getValue<
              Pick<
                tVehicleModelModel,
                "name" | "description" | "modelYear" | "manufacturer"
              >
            >();

          return (
            <VehicleModel
              title={name}
              description={description}
              modelYear={modelYear}
              manufacturer={manufacturer}
            />
          );
        },
      },
      {
        id: "specs",
        header: () => <Heading title={tVehicleModels("table.specs.header")} />,
        accessorFn: (row) => ({
          capacity: row.capacity,
          transmission: row.transmission,
          fuel: row.fuel,
        }),
        cell: (info) => {
          const { capacity, transmission, fuel } =
            info.getValue<
              Pick<tVehicleModelModel, "capacity" | "transmission" | "fuel">
            >();

          return (
            <Specs
              capacity={capacity}
              transmission={transmission}
              fuel={fuel}
            />
          );
        },
      },
      {
        header: () => <Heading title={tVehicleModels("table.colors.header")} />,
        accessorKey: "colors",
        cell: (info) => (
          <Colors colors={info.getValue<tVehicleModelModel["colors"]>()} />
        ),
      },
      {
        id: "price",
        header: () => <Heading title={tVehicleModels("table.price.header")} />,
        accessorFn: (row) => ({
          price: row.price,
          discount: row.discount,
        }),
        cell: (info) => {
          const { price, discount } =
            info.getValue<Pick<tVehicleModelModel, "price" | "discount">>();

          return <Price price={price} discount={discount} />;
        },
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.discount.header")} />
        ),
        accessorKey: "discount",
        cell: (info) => {
          const discount = info.getValue<tVehicleModelModel["discount"]>();

          return <Discount discount={discount} />;
        },
      },
      {
        header: () => <Heading title={tVehicleModels("table.status.header")} />,
        accessorKey: "status",
        cell: (info) => {
          const status = info.getValue<tVehicleModelModel["status"]>();
          return <Status status={status} />;
        },
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.updated-at.header")} />
        ),
        accessorKey: "updatedAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["updatedAt"]>())}
          />
        ),
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.created-at.header")} />
        ),
        accessorKey: "createdAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["createdAt"]>())}
          />
        ),
      },
      {
        id: "action",
        header: () => <Heading title={tVehicleModels("table.action.header")} />,
        cell: (info) => <Action vehicleModel={info.row.original} />,
      },
    ];
  }, []);

  const table = useReactTable({
    data: result?.isSuccess ? result.data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return null;
  if (!result?.isSuccess) return null;

  function onclick() {}

  return (
    <TabsContent value={tVehicleModels("label")} className="space-y-3">
      <Add />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn({
                    "max-w-86": cell.column.id === "vehicle-model",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

      <Pagination pagination={result.pagination} />
    </TabsContent>
  );
}

type tHeadingProps = {
  title: string;
};
function Heading({ title }: tHeadingProps) {
  return <h2 className="text-lg">{title}</h2>;
}

type tUuidProps = {
  uuid: tVehicleModelModel["uuid"];
};
function Uuid({ uuid }: tUuidProps) {
  return <Badge variant="muted">{uuid.slice(0, 8)}</Badge>;
}

type tVehicleModelProps = {
  title: tVehicleModelModel["name"];
  description: tVehicleModelModel["description"];
  modelYear: tVehicleModelModel["modelYear"];
  manufacturer: tVehicleModelModel["manufacturer"];
};
function VehicleModel({
  title,
  description,
  modelYear,
  manufacturer,
}: tVehicleModelProps) {
  return (
    <div>
      <span className="flex items-center gap-3">
        <ShadcnBadge variant="outline">{manufacturer}</ShadcnBadge>
        <h3 className="text-base">
          {title} {modelYear}
        </h3>
      </span>
      <p className="text-muted-foreground truncate">
        {description}
        {description}
      </p>
    </div>
  );
}

type tSpecsProps = {
  capacity: tVehicleModelModel["capacity"];
  transmission: tVehicleModelModel["transmission"];
  fuel: tVehicleModelModel["fuel"];
};
function Specs({ capacity, transmission, fuel }: tSpecsProps) {
  const tSpecs = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.specs.cell",
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <LuUsers size={16} />
          {tSpecs("capacity", {
            capacity: capacity,
          })}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuDot size={16} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <LuActivity size={16} />
          {tSpecs("transmission", {
            transmission: transmission,
          })}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuDot size={16} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <LuFuel size={16} />
          {tSpecs("fuel", {
            fuel: fuel,
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type tColorsProps = {
  colors: tVehicleModelModel["colors"];
};
function Colors({ colors }: tColorsProps) {
  return (
    <ul className="flex gap-1.5">
      {colors.map((color) => (
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
  );
}

type tPriceProps = {
  price: tVehicleModelModel["price"];
  discount: tVehicleModelModel["discount"];
};
function Price({ price, discount }: tPriceProps) {
  const tPrice = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.price",
  );
  const locale = useLocale() as eLocale;
  const monyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  return discount === 0 ? (
    <span>
      {tPrice.rich("cell", {
        price: monyFormatter.format(price - discount),
        span: (chunk) => (
          <span className="text-muted-foreground text-xs">{chunk}</span>
        ),
      })}
    </span>
  ) : (
    <span className="flex flex-col">
      <del className="text-muted-foreground">{monyFormatter.format(price)}</del>
      <ins className="no-underline">
        {tPrice.rich("cell", {
          price: monyFormatter.format(price - discount),
          span: (chunk) => (
            <span className="text-muted-foreground text-xs">{chunk}</span>
          ),
        })}
      </ins>
    </span>
  );
}

type tDiscountProps = {
  discount: tVehicleModelModel["discount"];
};
function Discount({ discount }: tDiscountProps) {
  const locale = useLocale() as eLocale;
  const monyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  return (
    <span
      className={cn("inline-flex w-full items-center gap-1", {
        "text-blue-500": discount === 0,
        "text-emerald-500": discount !== 0,
      })}
    >
      {monyFormatter.format(discount)}
      <MdOutlineDiscount size={16} />
    </span>
  );
}

type tStatusProps = {
  status: tVehicleModelModel["status"];
};
function Status({ status }: tStatusProps) {
  const tStatus = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.status",
  );

  return (
    <Badge
      variant={status === eVehicleModelStatusModel.active ? "success" : "muted"}
      className="flex items-center gap-1"
    >
      {status === eVehicleModelStatusModel.active ? (
        <LuCircleCheck />
      ) : (
        <LuCircleX />
      )}
      {tStatus("cell", {
        status: status,
      })}
    </Badge>
  );
}

type tTimeProps = {
  date: Date;
};
function Time({ date }: tTimeProps) {
  const locale = useLocale() as eLocale;
  const dateFormatter = new ClsDateFormatter(locale);

  const formattedDate = dateFormatter.format(date);

  return <time dateTime={formattedDate}>{formattedDate}</time>;
}

type tActionProps = {
  vehicleModel: tVehicleModelModel;
};
function Action({ vehicleModel }: tActionProps) {
  const tAction = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.action.cell",
  );

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
          <button className="size-full">
            <LuBookOpenText />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button className="size-full text-blue-500! hover:bg-blue-500/10!">
            <LuPenLine className="text-blue-500" />
            {tAction("edit.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <button className="size-full">
            <LuTrash2 />
            {tAction("delete.label")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Add() {
  const tAdd = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.add-new",
  );
  const { control, handleSubmit } = useForm<tVehicleModelCreate>({
    resolver: zodResolver(zVehicleModelCreate),
  });

  function onSubmit(data: tVehicleModelCreate) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          {tAdd("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)]"
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{tAdd("title")}</DialogTitle>
            <DialogDescription>{tAdd("description")}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <form onSubmit={handleSubmit(onSubmit)}></form>
      </DialogContent>
    </Dialog>
  );
}
