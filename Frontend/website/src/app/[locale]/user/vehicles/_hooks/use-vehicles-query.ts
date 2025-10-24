import { VehicleService } from "@/services/user/vehicle";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "@/hooks/use-search-params";

export function useVehiclesQuery() {
  const vehicleService = new VehicleService();

  const searchParams = useSearchParams();
  const [search = "", transmission = "", fuel = ""] = searchParams.getMany([
    "search",
    "transmission",
    "fuel",
  ]);

  const [
    minCapacityS = "0",
    maxCapacityS = "0",
    minPriceS = "0",
    maxPriceS = "0",
    hasDiscountS,

    pageS = "1",
    limitS = "10",
  ] = searchParams.getMany([
    "minCapacity",
    "maxCapacity",
    "minPrice",
    "maxPrice",
    "hasDiscount",

    "page",
    "limit",
  ]);

  const [
    minCapacity,
    maxCapacity,
    minPrice,
    maxPrice,
    hasDiscount,

    page,
    limit,
  ] = [
    Number(minCapacityS) || 0,
    Number(maxCapacityS) || 0,
    Number(minPriceS) || 0,
    Number(maxPriceS) || 0,
    Boolean(hasDiscountS),

    Number(pageS),
    Number(limitS),
    Number(pageS) || 1,
    Number(limitS) || 10,
  ];

  const {
    isLoading,
    isError,
    data: result,
    error,
  } = useQuery({
    queryKey: [
      "vehicles",
      search,
      transmission,
      fuel,
      minCapacity,
      maxCapacity,
      minPrice,
      maxPrice,
      hasDiscount,
      page,
      limit,
    ],
    queryFn: () =>
      vehicleService.GetMany(
        {
          search: search,
          transmission: transmission,
          fuel: fuel,
          minCapacity: minCapacity,
          maxCapacity: maxCapacity,
          minPrice: minPrice,
          maxPrice: maxPrice,
          hasDiscount: hasDiscount,
        },
        { page: page, limit: limit },
      ),
  });

  return {
    isLoading,
    isError,
    result,
    error,
  };
}
