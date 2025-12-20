import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ClsVehicleModelService } from "@/services/partner/vehicle-model";

import { tVehicleModelFilter } from "@/validations/partner/vehicle-model";
import { tPagination } from "@/validations/pagination";

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
    status,
    page,
    pageSize,
  ] = [
    searchParams.get("vehicle-model-filter.capacity.min"),
    searchParams.get("vehicle-model-filter.capacity.max"),
    searchParams.get("vehicle-model-filter.price.min"),
    searchParams.get("vehicle-model-filter.price.max"),
    searchParams.get("vehicle-model-filter.discount.min"),
    searchParams.get("vehicle-model-filter.discount.max"),
    searchParams.get("vehicle-model-filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const filter: tVehicleModelFilter = {
    search: searchParams.get("vehicle-model-filter.search") ?? undefined,
    categories: searchParams
      .getAll("vehicle-model-filter.categories")
      .map((category) => Number(category)),
    capacity: {
      min: minCapacity !== null ? Number(minCapacity) : undefined,
      max: maxCapacity !== null ? Number(maxCapacity) : undefined,
    },
    transmissions: searchParams.getAll("vehicle-model-filter.transmissions"),
    fuels: searchParams.getAll("vehicle-model-filter.model-years"),
    colors: searchParams.getAll("vehicle-model-filter.colors"),
    price: {
      min: minPrice !== null ? Number(minPrice) : undefined,
      max: maxPrice !== null ? Number(maxPrice) : undefined,
    },
    discount: {
      min: minDiscount !== null ? Number(minDiscount) : undefined,
      max: maxDiscount !== null ? Number(maxDiscount) : undefined,
    },
    status: status !== null ? Number(status) : undefined,
  };
  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "vehicle-models",
      filter.search,
      filter.capacity,
      filter.transmissions,
      filter.fuels,
      filter.colors,
      filter.price,
      filter.discount,
      filter.status,
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
