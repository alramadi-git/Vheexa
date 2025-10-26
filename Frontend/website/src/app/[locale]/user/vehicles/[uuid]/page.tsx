import type { Metadata } from "next";

import type { tVehicleModel } from "@/models/user/vehicle";
import { VehicleService } from "@/services/user/vehicle";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { RiSteeringFill } from "react-icons/ri";
import { LuFuel, LuUsersRound } from "react-icons/lu";

import { LEVEL } from "@/components/locals/blocks/typography";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/card";

import { Fragment } from "react";
import { Badge } from "@/components/shadcn/badge";
import Carousel from "./_components/carousel";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata(
  props: PageProps<"/[locale]/user/vehicles/[uuid]">,
): Promise<Metadata> {
  const vehicleService = new VehicleService();
  const { uuid } = await props.params;

  const result = await vehicleService.GetOne(uuid);
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
  const vehicleService = new VehicleService();

  const { locale, uuid } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("app.user.vehicles.uuid.page.product");

  const result = await vehicleService.GetOne(uuid);
  if (result.isSuccess === false) notFound();

  const vehicle = result.data;

  return (
    <Fragment>
      <Section className="h-hero">
        <Container className="grid h-full grid-cols-2 gap-6">
          <Carousel thumbnail={vehicle.thumbnail} images={vehicle.images} />

          <div className="flex flex-col">
            <Badge variant="outline" className="text-lg">
              {vehicle.manufacturer}
            </Badge>

            <Intro>
              <Title level={LEVEL.H1} className="mb-0">
                {vehicle.name}
              </Title>
              <Description>{vehicle.description}</Description>
            </Intro>

            <Tabs
              defaultValue={t("tabs.specifications.label")}
              className="mt-6 grow gap-3"
            >
              <TabsList>
                <TabsTrigger value={t("tabs.specifications.label")}>
                  {t("tabs.specifications.label")}
                </TabsTrigger>
                <TabsTrigger value={t("tabs.comments-and-reviews.label")}>
                  {t("tabs.comments-and-reviews.label")}
                </TabsTrigger>
              </TabsList>

              <Specifications vehicle={vehicle} />
              <CommentsAndReviews />
            </Tabs>
          </div>
        </Container>
      </Section>
    </Fragment>
  );
}

type tSpecificationProps = {
  vehicle: tVehicleModel;
};
async function Specifications({ vehicle }: tSpecificationProps) {
  const t = await getTranslations(
    "app.user.vehicles.uuid.page.product.tabs.specifications",
  );

  return (
    <TabsContent value={t("label")} className="grid grid-cols-2 gap-3">
      <Card>
        <CardContent className="my-auto flex flex-col items-center">
          <RiSteeringFill size={32} className="mb-3" />
          <CardTitle className="text-xl font-medium">
            {t("content.transmission")}
          </CardTitle>
          <CardDescription className="text-base">
            {vehicle.transmission}
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="my-auto flex flex-col items-center">
          <LuFuel size={32} className="mb-3" />
          <CardTitle className="text-xl font-medium">
            {t("content.fuel")}
          </CardTitle>
          <CardDescription className="text-base">
            {vehicle.fuel}
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="my-auto flex flex-col items-center">
          <LuUsersRound size={32} className="mb-3" />
          <CardTitle className="text-xl font-medium">
            {t("content.capacity")}
          </CardTitle>
          <CardDescription className="text-base">
            {vehicle.capacity}
          </CardDescription>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

async function CommentsAndReviews() {
  const t = await getTranslations(
    "app.user.vehicles.uuid.page.product.tabs.comments-and-reviews",
  );

  return (
    <TabsContent value={t("label")} className="flex size-full">
      <p className="m-auto text-2xl font-bold">{t("content")}</p>
    </TabsContent>
  );
}
