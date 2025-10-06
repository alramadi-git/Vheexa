import * as Serialization from "class-transformer";

import { Vehicle } from "@/classes/vehicle";

import { UsersRound, Fuel } from "lucide-react";
import { RiSteeringFill } from "react-icons/ri";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/shadcn/card";
import { FullHDImage } from "@/components/locals/blocks/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";

import { Badge } from "@/components/shadcn/badge";
import { Separator } from "@/components/shadcn/separator";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { Mony } from "@/libraries/mony";
import { Fragment } from "react";

type TItemProps = {
  data: unknown;
};
export default function Item({ data }: TItemProps) {
  const monyFormatter = new Mony();
  const vehicle = Serialization.plainToInstance(Vehicle, data);

  return (
    <Card className="overflow-hidden rounded-md pt-0">
      <CardHeader className="relative h-58 px-0">
        <FullHDImage
          src={vehicle.Thumbnail.URL}
          alt={vehicle.Name}
          className="h-58"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-transparent"></div>

        <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
          <FullHDImage
            src={vehicle.Partner.Logo.URL}
            alt={vehicle.Partner.Name}
            className="size-10 rounded-lg"
          />

          <div>
            <h4 className="text-foreground text-lg leading-5 font-bold">
              {vehicle.Partner.Name}
            </h4>
            <p className="text-muted-foreground text-sm font-medium">
              {vehicle.Partner.Email}
            </p>
          </div>
        </div>

        {/** When the vehicle was created */}
        <ul className="absolute bottom-0 left-0 z-10 flex flex-wrap gap-1 p-3">
          {vehicle.Colors.map((color, index) => (
            <li
              key={index}
              className="h-1 w-8 rounded-full shadow-2xl shadow-red-500"
              style={{
                background: color.HexCode,
              }}
            ></li>
          ))}
        </ul>
      </CardHeader>
      <CardContent className="space-y-2">
        <Carousel className="mx-2 w-full max-w-xs">
          <CarouselContent className="px-2">
            {vehicle.Tags.map((tag, index) => (
              <CarouselItem key={index} className="basis-auto ps-2 select-none">
                <Badge variant="outline">#{tag}</Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-between">
          <CardTitle>{vehicle.Name}</CardTitle>

          <Badge variant="outline" className="gap-1">
            {vehicle.ManufacturingYear.getFullYear()}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {vehicle.Description}
        </CardDescription>

        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1">
            <RiSteeringFill className="size-4" />
            <span className="text-sm font-medium">{vehicle.Transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="size-4" />
            <span className="text-sm font-medium">{vehicle.Fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersRound className="size-4" />
            <span className="text-sm font-medium">
              {vehicle.Capacity} Capacity
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-end gap-3 pb-0">
        <div>
          <p className="text-lg leading-normal font-medium">
            {monyFormatter.format(vehicle.Price.Total())}
          </p>

          <div className="flex items-center gap-0.5 text-xs">
            {vehicle.Price.IsDiscounted() && (
              <Fragment>
                <del className="leading-normal">
                  {monyFormatter.format(vehicle.Price.Value)}
                </del>

                <span className="">/</span>
              </Fragment>
            )}
            <p className="">A day</p>
          </div>
        </div>

        <Separator orientation="vertical" />

        <Button asChild className="grow">
          <Link href={`/user/vehicles/${vehicle.ID}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
