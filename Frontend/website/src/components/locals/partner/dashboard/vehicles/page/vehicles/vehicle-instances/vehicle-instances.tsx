"use client";

import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/shadcn/tabs";

export default function VehicleInstances() {
  const tVehicleInstances = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-instances",
  );

  return (
    <TabsContent value={tVehicleInstances("label")} className="h-96 flex items-center justify-center">
      <h2 className="text-3xl font-bold">
        {tVehicleInstances("content.coming-soon")}
      </h2>
    </TabsContent>
  );
}
