import { useSearchParams } from "next/navigation";

import { tVehicleModelFilter } from "@/validations/partner/vehicle-model-filter";
import { tPagination } from "@/validations/pagination";

import { ClsVehicleModelService } from "@/services/partner/dashboard/vehicle-model";
import { ClsQuery } from "@/libraries/query";

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
      min: minCapacity !== undefined ? Number(minCapacity) : undefined,
      max: maxCapacity !== undefined ? Number(maxCapacity) : undefined,
    },
    transmissions: searchParams
      .getAll("vehicle-model-filter.transmissions")
      .map((transmission) => Number(transmission)),
    fuels: searchParams
      .getAll("vehicle-model-filter.model-years")
      .map((fuel) => Number(fuel)),
    colors: searchParams.getAll("vehicle-model-filter.colors"),
    price: {
      min: minPrice !== undefined ? Number(minPrice) : undefined,
      max: maxPrice !== undefined ? Number(maxPrice) : undefined,
    },
    discount: {
      min: minDiscount !== undefined ? Number(minDiscount) : undefined,
      max: maxDiscount !== undefined ? Number(maxDiscount) : undefined,
    },
    statuses: searchParams
      .getAll("vehicle-model-filter.statuses")
      .map((status) => Number(status)),
  };
  const pagination: tPagination = {
    page: page !== undefined ? Number(page) : undefined,
    pageSize: pageSize !== undefined ? Number(pageSize) : undefined,
  };

  const clsQuery = new ClsQuery();

  clsQuery.set("vehicle-model-filter.search", filter.search);

  clsQuery.setMany(
    "vehicle-model-filter.model-year",
    filter.modelYears.map((modelYear) => modelYear.toString()),
  );

  clsQuery.set(
    "vehicle-model-filter.capacity.min",
    filter.capacity.min?.toString(),
  );
  clsQuery.set(
    "vehicle-model-filter.capacity.max",
    filter.capacity.max?.toString(),
  );

  clsQuery.setMany(
    "vehicle-model-filter.transmissions",
    filter.transmissions.map((transmission) => transmission.toString()),
  );

  clsQuery.setMany(
    "vehicle-model-filter.fuels",
    filter.fuels.map((fuel) => fuel.toString()),
  );

  clsQuery.setMany("vehicle-model-filter.colors", filter.colors);

  clsQuery.set("vehicle-model-filter.price.min", filter.price.min?.toString());
  clsQuery.set("vehicle-model-filter.price.max", filter.price.max?.toString());

  clsQuery.set(
    "vehicle-model-filter.discount.min",
    filter.discount.min?.toString(),
  );
  clsQuery.set(
    "vehicle-model-filter.discount.max",
    filter.discount.max?.toString(),
  );

  clsQuery.setMany(
    "vehicle-model-filter.statuses",
    filter.statuses.map((status) => status.toString()),
  );

  clsQuery.set("pagination.page", pagination.page?.toString());
  clsQuery.set("pagination.pageSize", pagination.pageSize?.toString());

  const {
    isLoading,
    isError,
    data: result,
    error,
  } = useQuery({
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
    isError,
    result,
    error,
  };
}
