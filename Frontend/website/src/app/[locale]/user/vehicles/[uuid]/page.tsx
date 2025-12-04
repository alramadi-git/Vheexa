import type { Metadata } from "next";

import { ClsVehicleService } from "@/services/user/vehicle";

import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { H } from "@/components/locals/blocks/typography";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { Fragment } from "react";
import { Badge } from "@/components/shadcn/badge";
import Carousel from "../../../../../components/locals/[user]/[vehicles]/[uuid]/carousel";
import { clsVehicle } from "@/classes/user/vehicle";
import Tabs from "../../../../../components/locals/[user]/[vehicles]/[uuid]/tabs";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
): Promise<Metadata> {
  const vehicleService = new ClsVehicleService();
  const { uuid } = await props.params;

  const result = await vehicleService.getOneAsync(uuid);
  if (result.isSuccess === false) notFound();

  const vehicle = result.data;
  return {
    title: vehicle.name,
    description: vehicle.description,
  };
}

export default async function Page(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
) {
  const vehicleService = new ClsVehicleService();

  const { locale, uuid } = await props.params;
  setRequestLocale(locale);

  const result = await vehicleService.getOneAsync(uuid);
  if (result.isSuccess === false) notFound();

  const vehicleModel = result.data;
  const vehicle = new clsVehicle(vehicleModel);

  return (
    <Fragment>
      <Section className="h-hero">
        <Container className="grid min-h-full grid-cols-2 gap-6">
          <Carousel
            thumbnailModel={vehicleModel.thumbnail}
            imagesModel={vehicleModel.images}
          />

          <div className="flex flex-col">
            <Badge variant="outline" className="text-lg">
              {vehicle.manufacturer}
            </Badge>

            <Intro>
              <Title heading={H._1} className="mb-0">
                {vehicle.name}
              </Title>
              <Description>{vehicle.description}</Description>
            </Intro>

            <Tabs vehicleModel={vehicleModel} />
          </div>
        </Container>
      </Section>
    </Fragment>
  );
}
