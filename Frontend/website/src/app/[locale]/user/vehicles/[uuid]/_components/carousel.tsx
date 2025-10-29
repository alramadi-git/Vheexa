"use client";

import { tNullable } from "@/types/nullish";
import { tVehicleModel } from "@/models/user/vehicle";

import { useCallback, useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { FullHDImage } from "@/components/locals/blocks/image";
import { clsImage } from "@/classes/user/image";

type tCarouselProps = {
  thumbnailModel: tVehicleModel["thumbnail"];
  imagesModel: tVehicleModel["images"];
};

export default function Carousel({
  thumbnailModel,
  imagesModel,
}: tCarouselProps) {
  const [navigationCarouselApi, setNavigationCarouselApi] =
    useState<tNullable<CarouselApi>>(null);
  const [mainCarouselApi, setMainCarouselApi] =
    useState<tNullable<CarouselApi>>(null);

  const onSelect = useCallback(
    function onSelect(api: CarouselApi) {
      mainCarouselApi?.scrollTo(api?.selectedScrollSnap() ?? 0);
      navigationCarouselApi?.scrollTo(api?.selectedScrollSnap() ?? 0);
    },
    [mainCarouselApi, navigationCarouselApi],
  );

  useEffect(() => {
    mainCarouselApi?.on("select", (api) => onSelect(api));
    navigationCarouselApi?.on("select", (api) => onSelect(api));
  }, [mainCarouselApi, navigationCarouselApi, onSelect]);

  const thumbnail =
    thumbnailModel == null ? null : new clsImage(thumbnailModel);
  const images = imagesModel.map((image) => new clsImage(image));

  return (
    <div className="grid grid-cols-4 gap-2">
      <ShadcnCarousel
        setApi={setNavigationCarouselApi}
        opts={{
          align: "start",
        }}
        orientation="vertical"
      >
        <CarouselContent className="-mt-1 h-[590px]">
          {thumbnail && (
            <CarouselItem key={thumbnail.uuid} className="basis-1/5 pt-2">
              <FullHDImage src={thumbnail.url} alt="" className="rounded-sm" />
            </CarouselItem>
          )}
          {images.map((image) => (
            <CarouselItem key={image.uuid} className="basis-1/5 pt-2">
              <FullHDImage src={image.url} alt="" className="rounded-sm" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </ShadcnCarousel>

      <ShadcnCarousel
        setApi={setMainCarouselApi}
        opts={{
          align: "start",
        }}
        className="col-span-3"
      >
        <CarouselContent>
          {thumbnail && (
            <CarouselItem
              key={thumbnail.uuid}
              id={thumbnail.uuid}
              className="h-[590px]"
            >
              <FullHDImage
                src={thumbnail.url}
                alt=""
                className="size-full rounded-sm"
              />
            </CarouselItem>
          )}
          {images.map((image) => (
            <CarouselItem
              key={image.uuid}
              id={image.uuid}
              className="h-[590px]"
            >
              <FullHDImage
                src={image.url}
                alt=""
                className="size-full rounded-sm"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </ShadcnCarousel>
    </div>
  );
}
