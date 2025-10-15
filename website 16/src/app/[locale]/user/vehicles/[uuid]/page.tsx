import type { Metadata } from "next";

import { VehicleService } from "@/services/user/vehicle/vehicle";

import { setRequestLocale } from "next-intl/server";
import * as Serialization from "class-transformer";

import { Fragment } from "react";

import { LEVEL } from "@/components/locals/blocks/typography";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { FullHDImage } from "@/components/locals/blocks/image";
import { Badge } from "@/components/shadcn/badge";

export const dynamic = "force-static";
export async function generateMetadata(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
): Promise<Metadata> {
  const { uuid } = await props.params;

  // const result = VehicleService.GetOne(uuid);
  // const vehicle = result.Data;

  return {
    // title: vehicle.Name,
    // description: vehicle.Description,
  };
}

export default async function Page(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
) {
  const { locale, uuid } = await props.params;
  setRequestLocale(locale);

  const response = await VehicleService.GetOne(uuid);
  console.log(response)
  // const vehicle = Serialization.plainToInstance(Vehicle, result.Data);

  return (
    <Fragment>
      {/* <Section className="h-hero">
        <Container className="grid h-full grid-cols-2 gap-6">
          <div className="relative size-full overflow-hidden rounded-md">
            <FullHDImage
              src={vehicle.Thumbnail.URL}
              alt={vehicle.Name}
              className="absolute inset-0 size-full"
            />
          </div>

          <div className="">
            <Badge variant="outline" className="text-lg">
              {vehicle.Category}
            </Badge>

            <Intro>
              <Title level={LEVEL.H1}>{vehicle.Name}</Title>
              <Description>{vehicle.Description}</Description>
            </Intro>
          </div>
        </Container>
      </Section> */}
    </Fragment>
  );
}
