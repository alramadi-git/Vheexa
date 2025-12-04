"use client";

import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

import { Section, Intro } from "@/components/locals/blocks/typography";
import { Description, Title } from "../../../blocks/typographies";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { useTranslations } from "next-intl";
import VehicleModels from "./vehicles-models";
import VehicleInstances from "./vehicle-instances";

export default function Vehicles() {
  const tVehicles = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles",
  );

  return (
    <Section className="h-fullscreen">
      <ShadcnTabs asChild defaultValue={tVehicles("vehicle-models.label")}>
        <Card>
          <CardContent className="block space-y-3.5">
            <CardHeader className="flex justify-between px-0">
              <Intro className="space-y-1">
                <CardTitle>
                  <Title heading="h1">{tVehicles("title")}</Title>
                </CardTitle>
                <CardDescription>
                  <Description>{tVehicles("description")}</Description>
                </CardDescription>
              </Intro>
              <TabsList>
                <TabsTrigger  value={tVehicles("vehicle-models.label")}>
                  {tVehicles("vehicle-models.label")}
                </TabsTrigger>
                <TabsTrigger  value={tVehicles("vehicle-instances.label")}>
                  {tVehicles("vehicle-instances.label")}
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <VehicleModels />
            <VehicleInstances />
          </CardContent>
        </Card>
      </ShadcnTabs>
    </Section>
  );
}
