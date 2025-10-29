"use client";

import type { tVehicleModel } from "@/models/user/vehicle";

import { Mony } from "@/libraries/mony";

import { useTranslations } from "next-intl";
import { useVehiclesQuery } from "../../../_hooks/use-vehicles-query";

import { RiSteeringFill } from "react-icons/ri";
import { LuFuel, LuUsersRound } from "react-icons/lu";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import Filters from "./filters";
import { List } from "@/components/locals/blocks/list";
import Pagination from "@/components/locals/blocks/pagination";

import { Fragment } from "react";
import { Section, Container } from "@/components/locals/blocks/typography";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { Separator } from "@/components/shadcn/separator";
import { FullHDImage } from "@/components/locals/blocks/image";
import { Skeleton } from "@/components/shadcn/skeleton";
import { ErrorToast } from "@/components/locals/blocks/toast";
import { toast } from "sonner";
import { clsVehicle } from "@/classes/user/vehicle";

export default function Products() {
  const { isLoading, result } = useVehiclesQuery();

  if (result !== undefined && !result?.isSuccess) {
    console.error("error status code: ", result.statusCode);
    console.error("error status text: ", result.statusText);
    console.error("error message: ", result.message);
    console.error("error issues: ", result.issues);

    toast.custom(() => <ErrorToast error={result} />);
  }

  return (
    <Section>
      <Container className="flex gap-4">
        <Filters />
        <div className="flex min-h-full w-full flex-col justify-between gap-4">
          <Fragment>
            <List<tVehicleModel>
              items={result?.isSuccess ? result.data : []}
              render={(item) => <Item key={item.uuid} vehicleModel={item} />}
              loading={{
                isLoading,
                render: (_, index) => <ItemSkeleton key={index} />,
              }}
              error={{
                isError: !result?.isSuccess,
              }}
              className="grid w-full grid-cols-3 gap-6"
            />

            {result?.isSuccess && <Pagination pagination={result.pagination} />}
          </Fragment>
        </div>
      </Container>
    </Section>
  );
}

type tItemProps = {
  vehicleModel: tVehicleModel;
};
function Item({ vehicleModel }: tItemProps) {
  const t = useTranslations("app.user.vehicles.page.products.product");

  const monyFormatter = new Mony();
  const vehicle = new clsVehicle(vehicleModel);

  return (
    <Card className="overflow-hidden rounded-md pt-0">
      <CardHeader className="relative h-58 px-0">
        <FullHDImage
          src={vehicle.thumbnail!.url}
          alt={vehicle.name}
          className="h-58"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-transparent"></div>

        <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
          <FullHDImage
            src={vehicle.partner.logo!.url}
            alt={vehicle.partner.name}
            className="size-10 rounded-lg"
          />

          <div>
            <h4 className="text-foreground text-lg leading-5 font-bold">
              {vehicle.partner.name}
            </h4>
            <p className="text-muted-foreground text-sm font-medium">
              {vehicle.partner.email}
            </p>
          </div>
        </div>

        <ul className="absolute bottom-0 left-0 z-10 flex flex-wrap gap-1 p-3">
          {vehicle.colors.map((color, index) => (
            <li
              key={index}
              className="h-1 w-8 rounded-full shadow-2xl shadow-red-500"
              style={{
                background: color.hexCode,
              }}
            ></li>
          ))}
        </ul>
      </CardHeader>
      <CardContent className="space-y-2">
        <Carousel className="w-full max-w-xs">
          <CarouselContent className="p-2">
            {vehicle.tags.map((tag, index) => (
              <CarouselItem key={index} className="basis-auto ps-2 select-none">
                <Badge variant="outline">#{tag}</Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-between">
          <CardTitle>{vehicle.name}</CardTitle>

          <Badge variant="outline" className="gap-1">
            {vehicle.modelYear.getFullYear()}
          </Badge>
        </div>

        <CardDescription className="line-clamp-2">
          {vehicle.description}
        </CardDescription>

        <Separator />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1">
            <RiSteeringFill className="size-4" />
            <span className="text-sm font-medium">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <LuFuel className="size-4" />
            <span className="text-sm font-medium">{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <LuUsersRound className="size-4" />
            <span className="text-sm font-medium">
              {vehicle.capacity} {t("specifications.capacity")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-end gap-3 pb-0">
        <div>
          <p className="text-lg leading-normal font-medium">
            {monyFormatter.format(vehicle.getGrossPrice())}
          </p>

          <div className="flex items-center gap-0.5 text-xs">
            {vehicle.isDiscounted() && (
              <Fragment>
                <del className="leading-normal">
                  {monyFormatter.format(vehicle.getNetPrice())}
                </del>

                <span>/</span>
              </Fragment>
            )}
            <p>{t("price-per")}</p>
          </div>
        </div>

        <Separator orientation="vertical" />

        <Button asChild className="grow">
          <Link href={`/user/vehicles/${vehicle.uuid}`}>
            {t("view-details")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ItemSkeleton() {
  return (
    <Card className="overflow-hidden rounded-md pt-0">
      <CardHeader className="relative h-58 px-0">
        <Skeleton className="h-58 w-full rounded-none" />
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="flex gap-2">
          <li>
            <Skeleton className="h-2 w-16" />
          </li>
          <li>
            <Skeleton className="h-2 w-16" />
          </li>
          <li>
            <Skeleton className="h-2 w-16" />
          </li>
        </ul>

        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <Skeleton className="h-1 w-full" />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-end gap-3 pb-0">
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>

        <Skeleton className="h-full w-1" />

        <Skeleton className="h-full w-full" />
      </CardFooter>
    </Card>
  );
}
