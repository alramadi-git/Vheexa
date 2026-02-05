"use client";

import { useTranslations } from "next-intl";

import useVehicleModels from "@/partner/hooks/vehicle-models";

import { TabsContent } from "@/components/shadcn/tabs";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

export default function VehicleModels() {
  const { isLoading, result } = useVehicleModels();

  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  return (
    <TabsContent value={tVehicleModels("label")} className="space-y-3">
      <Filter />
      <Table
        isLoading={isLoading}
        isSuccess={result?.isSuccess || false}
        data={result?.isSuccess ? result.data : []}
      />
      {result?.isSuccess && <Pagination pagination={result.pagination} />}
    </TabsContent>
  );
}
