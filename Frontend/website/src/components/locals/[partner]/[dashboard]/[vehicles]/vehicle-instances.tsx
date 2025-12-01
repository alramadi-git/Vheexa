"use client";

import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/shadcn/tabs";

export default function VehicleInstances() {
  const tHero = useTranslations(
    "app.partner.dashboard.vehicles.page.hero.vehicle-instances",
  );

  return <TabsContent value={tHero("label")}>vehicle instances</TabsContent>;
}
