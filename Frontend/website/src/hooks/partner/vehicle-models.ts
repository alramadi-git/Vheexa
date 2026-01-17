"use client";

import { useSearchParams } from "next/navigation";
import useVehicleModelService from "@/services/partner/vehicle-model";

import { useQuery } from "@tanstack/react-query";

import { tVehicleModelFilter } from "@/validations/partner/vehicle-model";
import { tPagination } from "@/validations/pagination";

export default function useVehicleModels() {
  const searchParams = useSearchParams();
  const vehicleModelService = useVehicleModelService();

  const [
    searchQuery,
    categoriesQuery,
    minCapacityQuery,
    maxCapacityQuery,
    transmissionsQuery,
    fuelsQuery,
    minPriceQuery,
    maxPriceQuery,
    minDiscountQuery,
    maxDiscountQuery,
    statusQuery,
    pageQuery,
    pageSizeQuery,
  ] = [
    searchParams.get("vehicle-model-filter.search"),
    searchParams.getAll("vehicle-model-filter.categories"),
    searchParams.get("vehicle-model-filter.capacity.min"),
    searchParams.get("vehicle-model-filter.capacity.max"),
    searchParams.getAll("vehicle-model-filter.transmissions"),
    searchParams.getAll("vehicle-model-filter.fuels"),
    searchParams.get("vehicle-model-filter.price.min"),
    searchParams.get("vehicle-model-filter.price.max"),
    searchParams.get("vehicle-model-filter.discount.min"),
    searchParams.get("vehicle-model-filter.discount.max"),
    searchParams.get("vehicle-model-filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const [
    search,
    categories,
    minCapacity,
    maxCapacity,
    transmissions,
    fuels,
    minPrice,
    maxPrice,
    minDiscount,
    maxDiscount,
    status,
    page,
    pageSize,
  ] = [
    searchQuery ?? undefined,
    categoriesQuery.map((category) => Number(category)),
    minCapacityQuery !== null ? Number(minCapacityQuery) : undefined,
    maxCapacityQuery !== null ? Number(maxCapacityQuery) : undefined,
    transmissionsQuery,
    fuelsQuery,
    minPriceQuery !== null ? Number(minPriceQuery) : undefined,
    maxPriceQuery !== null ? Number(maxPriceQuery) : undefined,
    minDiscountQuery !== null ? Number(minDiscountQuery) : undefined,
    maxDiscountQuery !== null ? Number(maxDiscountQuery) : undefined,
    statusQuery !== null ? Number(statusQuery) : undefined,
    pageQuery !== null ? Number(pageQuery) : undefined,
    pageSizeQuery !== null ? Number(pageSizeQuery) : undefined,
  ];

  const filter: tVehicleModelFilter = {
    search,
    categories,
    capacity: {
      min: minCapacity,
      max: maxCapacity,
    },
    transmissions,
    fuels,
    price: {
      min: minPrice,
      max: maxPrice,
    },
    discount: {
      min: minDiscount,
      max: maxDiscount,
    },
    status,
  };

  const pagination: tPagination = {
    page: page !== null ? Number(page) : undefined,
    pageSize: pageSize !== null ? Number(pageSize) : undefined,
  };

  const { isLoading, data: result } = useQuery({
    queryKey: [
      "vehicle-models",
      filter.search,
      filter.categories.join(", "),
      filter.capacity.min,
      filter.capacity.max,
      filter.transmissions.join(", "),
      filter.fuels.join(", "),
      filter.price.min,
      filter.price.max,
      filter.discount.min,
      filter.discount.max,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => vehicleModelService.readMany(filter, pagination),
  });

  return {
    isLoading,
    result,
  };
}
