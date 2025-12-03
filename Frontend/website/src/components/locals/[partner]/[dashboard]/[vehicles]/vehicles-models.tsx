"use client";

import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/shadcn/tabs";

export default function VehicleModels() {
  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  return <TabsContent value={tVehicleModels("label")}>vehicle models</TabsContent>;
}
