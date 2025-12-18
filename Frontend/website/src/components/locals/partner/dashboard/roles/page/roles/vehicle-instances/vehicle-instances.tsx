"use client";

import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/shadcn/tabs";

export default function VehicleInstances() {
  const tVehicleInstances = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-instances",
  );

  return <TabsContent value={tVehicleInstances("label")}>vehicle instances</TabsContent>;
}
