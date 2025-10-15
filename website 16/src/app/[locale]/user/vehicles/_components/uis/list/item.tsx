import { Mony } from "@/libraries/mony";
import { tVehicle } from "@/app/[locale]/user/_types/vehicle";

import { RiSteeringFill } from "react-icons/ri";
import { Fuel, UsersRound } from "lucide-react";

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
import { Fragment } from "react";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { Separator } from "@/components/shadcn/separator";
import { FullHDImage } from "@/components/locals/blocks/image";

type tItemProps = {
  vehicle: tVehicle;
};

export default function Item({ vehicle }: tItemProps) {
  const monyFormatter = new Mony();

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
            {vehicle.modelYear}
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
            <Fuel className="size-4" />
            <span className="text-sm font-medium">{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersRound className="size-4" />
            <span className="text-sm font-medium">
              {vehicle.capacity} Capacity
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-end gap-3 pb-0">
        <div>
          <p className="text-lg leading-normal font-medium">
            {monyFormatter.format(
              vehicle.price - vehicle.discount * vehicle.price,
            )}
          </p>

          <div className="flex items-center gap-0.5 text-xs">
            {vehicle.discount !== 0 && (
              <Fragment>
                <del className="leading-normal">
                  {monyFormatter.format(vehicle.price)}
                </del>

                <span>/</span>
              </Fragment>
            )}
            <p>A day</p>
          </div>
        </div>

        <Separator orientation="vertical" />

        <Button asChild className="grow">
          <Link href={`/user/vehicles/${vehicle.uuid}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
