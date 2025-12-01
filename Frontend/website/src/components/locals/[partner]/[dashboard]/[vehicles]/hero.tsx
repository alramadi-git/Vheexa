"use client";

import {
  Tabs as ShadcnTabs,
  TabsContent,
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

export default function Hero() {
  const tHero = useTranslations("app.partner.dashboard.vehicles.page.hero");

  return (
    <Section className="h-fullscreen">
      <ShadcnTabs asChild defaultValue={tHero("vehicle-models.label")}>
        <Card>
          <CardContent className="block space-y-3.5">
            <CardHeader className="px-0 flex justify-between">
              <Intro className="space-y-1">
                <CardTitle>
                  <Title heading="h1">{tHero("title")}</Title>
                </CardTitle>
                <CardDescription>
                  <Description>{tHero("description")}</Description>
                </CardDescription>
              </Intro>
              <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
                <TabsTrigger
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                  value={tHero("vehicle-models.label")}
                >
                  {tHero("vehicle-models.label")}
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
                  value={tHero("vehicle-instances.label")}
                >
                  {tHero("vehicle-instances.label")}
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
