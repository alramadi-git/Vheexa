"use client";

import { useSearchParams } from "next/navigation";
import useVehicleModelService from "@/partner/services/vehicle-model";

import { useQuery } from "@tanstack/react-query";

import { tVehicleModelFilter } from "@/partner/validators/vehicle-model";
import { tPagination } from "@/validators/pagination";
import { useEffect, useState } from "react";

export default function useVehicleModels() {
  const [run, setRun] = useState(false);

  const searchParams = useSearchParams();
  const vehicleModelService = useVehicleModelService();

  const [
    searchQuery,
    categoriesQuery,
    minCapacityQuery,
    maxCapacityQuery,
    minPriceQuery,
    maxPriceQuery,
    minDiscountQuery,
    maxDiscountQuery,
    statusQuery,
    pageQuery,
    pageSizeQuery,
  ] = [
    searchParams.get("filter.search"),
    searchParams.getAll("filter.categories"),
    searchParams.get("filter.capacity.min"),
    searchParams.get("filter.capacity.max"),
    searchParams.get("filter.price.min"),
    searchParams.get("filter.price.max"),
    searchParams.get("filter.discount.min"),
    searchParams.get("filter.discount.max"),
    searchParams.get("filter.status"),
    searchParams.get("pagination.page"),
    searchParams.get("pagination.page-size"),
  ];

  const [
    search,
    categories,
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
    searchQuery ?? undefined,
    categoriesQuery.map((category) => Number(category)),
    minCapacityQuery !== null ? Number(minCapacityQuery) : undefined,
    maxCapacityQuery !== null ? Number(maxCapacityQuery) : undefined,
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
    page,
    pageSize,
  };

  const { isEnabled, isLoading, data: result } = useQuery({
    enabled: run,
    queryKey: [
      "vehicle-models",
      filter.search,
      filter.categories.join(", "),
      filter.capacity.min,
      filter.capacity.max,
      filter.price.min,
      filter.price.max,
      filter.discount.min,
      filter.discount.max,
      filter.status,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => vehicleModelService.search(filter, pagination),
  });

  useEffect(() => {
    setRun(true);
  }, []);

  return {
    isLoading: !isEnabled || isLoading ,
    result,
  };
}
