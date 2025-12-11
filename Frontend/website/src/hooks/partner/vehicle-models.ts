import { useSearchParams } from "next/navigation";

import { tVehicleModelFilter } from "@/validations/partner/vehicle-model-filter";
import { tPagination } from "@/validations/pagination";

import { ClsVehicleModelService } from "@/services/partner/dashboard/vehicle-model";

import { useQuery } from "@tanstack/react-query";

export default function useVehicleModels() {
  const searchParams = useSearchParams();
  const clsVehicleModelService = new ClsVehicleModelService();

  const [
    minCapacity,
    maxCapacity,
    minPrice,
    maxPrice,
    minDiscount,
    maxDiscount,
    page,
    pageSize,
  ] = [
    searchParams.get("vehicle-model-filter.capacity.min"),
    searchParams.get("vehicle-model-filter.capacity.max"),
    searchParams.get("vehicle-model-filter.price.min"),
    searchParams.get("vehicle-model-filter.price.max"),
    searchParams.get("vehicle-model-filter.discount.min"),
    searchParams.get("vehicle-model-filter.discount.max"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const filter: tVehicleModelFilter = {
    search: searchParams.get("vehicle-model-filter.search") ?? undefined,
    modelYears: searchParams
      .getAll("vehicle-model-filter.model-years")
      .map((modelYear) => Number(modelYear)),
    capacity: {
      min: minCapacity !== null ? Number(minCapacity) : undefined,
      max: maxCapacity !== null ? Number(maxCapacity) : undefined,
    },
    transmissions: searchParams
      .getAll("vehicle-model-filter.transmissions")
      .map((transmission) => Number(transmission)),
    fuels: searchParams
      .getAll("vehicle-model-filter.model-years")
      .map((fuel) => Number(fuel)),
    colors: searchParams.getAll("vehicle-model-filter.colors"),
    price: {
      min: minPrice !== null ? Number(minPrice) : undefined,
      max: maxPrice !== null ? Number(maxPrice) : undefined,
    },
    discount: {
      min: minDiscount !== null ? Number(minDiscount) : undefined,
      max: maxDiscount !== null ? Number(maxDiscount) : undefined,
    },
    statuses: searchParams
      .getAll("vehicle-model-filter.statuses")
      .map((status) => Number(status)),
  };
  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "vehicles",
      filter.search,
      filter.modelYears,
      filter.capacity,
      filter.transmissions,
      filter.fuels,
      filter.colors,
      filter.price,
      filter.discount,
      filter.statuses,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => clsVehicleModelService.getManyAsync(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
