import { ClsVehicleModelService } from "@/services/user/vehicle-model";

import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@/hooks/query";

export function useVehicleModels() {
  const vehicleService = new ClsVehicleModelService();
  const searchParams = useQuery();

  const [
    search = "",
    transmission = "",
    fuel = "",

    _minCapacity = "0",
    _maxCapacity = "0",
    _minPrice = "0",
    _maxPrice = "0",
    _hasDiscount = "0",

    _page = "1",
    _limit = "10",
  ] = searchParams.getMany([
    "search",
    "transmission",
    "fuel",

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
    Number(_minCapacity) || 0,
    Number(_maxCapacity) || 0,
    Number(_minPrice) || 0,
    Number(_maxPrice) || 0,
    Boolean(Number(_hasDiscount) || 0),

    Number(_page),
    Number(_limit),
    Number(_page) || 1,
    Number(_limit) || 10,
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
      vehicleService.getMany(
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
        { page: page, pageSize: limit },
      ),
  });

  return {
    isLoading,
    isError,
    result,
    error,
  };
}
