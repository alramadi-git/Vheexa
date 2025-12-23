"use client";
import { eLocale } from "@/i18n/routing";

import {
  eVehicleModelStatusModel,
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
import { useLocale, useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-models";

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

import {
  Table as ShadcnTable,
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

import { Badge as ShadcnBadge } from "@/components/shadcn/badge";
import { Badge } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";

type tVehicleModelsProps = {
  data: ReturnType<typeof useVehicleModels>;
};

export default function Table({
  data: { isLoading, result },
}: tVehicleModelsProps) {
  const tTable = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table",
  );

  const columns: ColumnDef<tVehicleModelModel>[] = useMemo(() => {
    return [
      {
        header: () => <Heading title={tTable("uuid.header")} />,
        accessorKey: "uuid",
        cell: (info) => (
          <Uuid uuid={info.getValue<tVehicleModelModel["uuid"]>()} />
        ),
      },
      {
        id: "vehicle-model",
        header: () => (
          <Heading title={tTable("vehicle-model.header")}></Heading>
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
        header: () => <Heading title={tTable("specs.header")} />,
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
        header: () => <Heading title={tTable("colors.header")} />,
        accessorKey: "colors",
        cell: (info) => (
          <Colors colors={info.getValue<tVehicleModelModel["colors"]>()} />
        ),
      },
      {
        id: "price",
        header: () => <Heading title={tTable("price.header")} />,
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
        header: () => <Heading title={tTable("discount.header")} />,
        accessorKey: "discount",
        cell: (info) => {
          const discount = info.getValue<tVehicleModelModel["discount"]>();

          return <Discount discount={discount} />;
        },
      },
      {
        header: () => <Heading title={tTable("status.header")} />,
        accessorKey: "status",
        cell: (info) => {
          const status = info.getValue<tVehicleModelModel["status"]>();
          return <Status status={status} />;
        },
      },
      {
        header: () => <Heading title={tTable("updated-at.header")} />,
        accessorKey: "updatedAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["updatedAt"]>())}
          />
        ),
      },
      {
        header: () => <Heading title={tTable("created-at.header")} />,
        accessorKey: "createdAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["createdAt"]>())}
          />
        ),
      },
      {
        id: "action",
        header: () => <Heading title={tTable("action.header")} />,
        cell: (info) => <Action vehicleModel={info.row.original} />,
      },
    ];
  }, [tTable]);

  const table = useReactTable({
    data: result?.isSuccess ? result.data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return null;
  if (!result?.isSuccess) return null;

  return (
    <ShadcnTable>
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
    </ShadcnTable>
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
          {transmission}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuDot size={16} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <LuFuel size={16} />
          {fuel}
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
