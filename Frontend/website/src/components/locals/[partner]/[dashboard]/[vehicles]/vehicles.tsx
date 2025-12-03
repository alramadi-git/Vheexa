"use client";

import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

import {
  Description,
  Intro,
  Section,
  Title,
} from "@/components/locals/blocks/typography";
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
  const tVehicles = useTranslations("app.partner.dashboard.vehicles.page.vehicles");

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
              <TabsList className="bg-background w-fit p-0">
                <TabsTrigger
                  value={tVehicles("vehicle-models.label")}
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative rounded-none border after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                >
                  {tVehicles("vehicle-models.label")}
                </TabsTrigger>
                <TabsTrigger
                  value={tVehicles("vehicle-instances.label")}
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative rounded-none border after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                >
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
