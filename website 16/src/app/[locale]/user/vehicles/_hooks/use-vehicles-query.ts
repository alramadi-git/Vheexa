import { useQuery } from "@tanstack/react-query";
import { VehicleService } from "../../_services/vehicle/vehicle";
import { useSearchParams } from "@/hooks/use-search-params";

export function useVehiclesQuery() {
  const searchParams = useSearchParams();
  const [
    search = "",
    transmission = "",
    fuel = "",
    minCapacity = "0",
    maxCapacity = "0",
    minPrice = "0",
    maxPrice = "0",
    hasDiscount = "false",
    page = "1",
    limit = "10",
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
      VehicleService.GetMany(
        {
          search: search,
          transmission: transmission,
          fuel: fuel,
          minCapacity: Number(minCapacity),
          maxCapacity: Number(maxCapacity),
          minPrice: Number(minPrice),
          maxPrice: Number(maxPrice),
          hasDiscount: Boolean(hasDiscount),
        },
        { page: Number(page), limit: Number(limit) },
      ),
  });

  return {
    isLoading,
    isError,
    result,
    error,
  };
}
