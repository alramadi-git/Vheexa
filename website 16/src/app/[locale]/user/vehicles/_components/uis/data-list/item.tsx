import * as Serialization from "class-transformer";

import { Vehicle } from "@/classes/vehicle";
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
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";

import { Badge } from "@/components/shadcn/badge";

export default function Item(props: unknown) {
  const vehicle = Serialization.plainToInstance(Vehicle, props);

  return (
    <Card className="overflow-hidden rounded-md pt-0">
      <CardHeader className="relative h-58 px-0">
        <FullHDImage
          src={vehicle.Thumbnail.URL}
          alt={vehicle.Name}
          className="h-58"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-transparent"></div>

        <div className="absolute top-3 left-3 z-10 flex items-center gap-3">
          <FullHDImage
            src={vehicle.Partner.Logo.URL}
            alt={vehicle.Partner.Name}
            className="bg-muted-foreground size-12 rounded-lg p-0.5"
          />

          <div>
            <h4 className="text-foreground text-lg font-bold">
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
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
