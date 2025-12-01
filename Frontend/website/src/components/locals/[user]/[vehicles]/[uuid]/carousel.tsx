"use client";

import { tNullable } from "@/types/nullish";
import { tVehicleModel } from "@/models/vehicle";

import { useCallback, useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { FullHDImage } from "@/components/locals/blocks/image";
import { clsImage } from "@/classes/[user]/image";

type tCarouselProps = {
  thumbnailModel: tVehicleModel["thumbnail"];
  imagesModel: tVehicleModel["images"];
};

export default function Carousel({
  thumbnailModel,
  imagesModel,
}: tCarouselProps) {
  const [mainCarouselApi, setMainCarouselApi] =
    useState<tNullable<CarouselApi>>(null);
  const [subCarouselApi, setSubCarouselApi] =
    useState<tNullable<CarouselApi>>(null);

  useEffect(() => {
    if (!mainCarouselApi || !subCarouselApi) return;

    mainCarouselApi.on("select", (api) => onSelect(api, subCarouselApi));
    subCarouselApi.on("select", (api) => onSelect(api, mainCarouselApi));
  }, [mainCarouselApi, subCarouselApi]);

  const thumbnail =
    thumbnailModel == null ? null : new clsImage(thumbnailModel);
  const images = imagesModel.map((image) => new clsImage(image));

  function onSelect(api: CarouselApi, subApi: CarouselApi) {
    const index = api?.selectedScrollSnap() ?? 0;
    subApi?.scrollTo(index);
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      <ShadcnCarousel
        setApi={setSubCarouselApi}
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
