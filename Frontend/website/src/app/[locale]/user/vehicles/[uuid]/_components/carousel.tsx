import { Card, CardContent } from "@/components/shadcn/card";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";
import { tVehicleModel } from "@/models/user/vehicle";

type tCarouselProps = {
  thumbnail: tVehicleModel["thumbnail"];
  images: tVehicleModel["images"];
};

export default function Carousel({ thumbnail, images }: tCarouselProps) {
  return (
    <div className="flex h-full">
      <ShadcnCarousel
        opts={{
          align: "start",
          
        }}
        orientation="vertical"
        className="w-[165px]"
      >
        <CarouselContent className="-mt-1 h-[650px]">
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </ShadcnCarousel>

      {/* <ShadcnCarousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </ShadcnCarousel> */}
    </div>
  );
}
