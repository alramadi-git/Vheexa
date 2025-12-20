import { NextRequest, NextResponse } from "next/server";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import {
  tVehicleFilter,
  zVehicleFilter,
} from "@/validations/user/vehicles/vehicle-filter";
import { ePageSize, tPagination, zPagination } from "@/validations/pagination";

import { ClsErrorModel } from "@/models/error";

import { tSuccessManyModel } from "@/models/success";
import { tResponseManyModel } from "@/models/response";

import { apiCatch } from "@/utilities/api";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tVehicleModelModel>>> {
  return await apiCatch<tVehicleModelModel>(async () => {
    const filter: tVehicleFilter = {
      search: request.nextUrl.searchParams.get("search") ?? "",
      transmission: request.nextUrl.searchParams.get("transmission") ?? "",
      fuel: request.nextUrl.searchParams.get("fuel") ?? "",
      minCapacity: Number(
        request.nextUrl.searchParams.get("min-capacity") ?? 0,
      ),
      maxCapacity: Number(
        request.nextUrl.searchParams.get("max-capacity") ?? 0,
      ),
      minPrice: Number(request.nextUrl.searchParams.get("min-price") ?? 0),
      maxPrice: Number(request.nextUrl.searchParams.get("max-price") ?? 0),
      hasDiscount: Boolean(
        request.nextUrl.searchParams.get("has-discount") ?? false,
      ),
    };
    const pagination: tPagination = {
      page: Number(request.nextUrl.searchParams.get("page") ?? 1),
      pageSize: Number(
        request.nextUrl.searchParams.get("page-size") ?? ePageSize.ten,
      ),
    };

    const parsedFilter: tVehicleFilter = zVehicleFilter.parse(filter);
    const parsedPagination: tPagination = zPagination.parse(pagination);

    const queryArray: string[] = [];

    if (parsedFilter.search !== "")
      queryArray.push(`Search.Value=${parsedFilter.search}`);
    if (parsedFilter.transmission !== "")
      queryArray.push(`Transmission.Value=${parsedFilter.transmission}`);
    if (parsedFilter.fuel !== "")
      queryArray.push(`Fuel.Value=${parsedFilter.fuel}`);

    if (parsedFilter.minCapacity !== 0)
      queryArray.push(`MinCapacity.Value=${parsedFilter.minCapacity}`);
    if (parsedFilter.maxCapacity !== 0)
      queryArray.push(`MaxCapacity.Value=${parsedFilter.maxCapacity}`);

    if (parsedFilter.minPrice !== 0)
      queryArray.push(`MinPrice.Value=${parsedFilter.minPrice}`);
    if (parsedFilter.maxPrice !== 0)
      queryArray.push(`MaxPrice.Value=${parsedFilter.maxPrice}`);

    if (parsedFilter.hasDiscount !== false)
      queryArray.push(`HasDiscount.Value=${parsedFilter.hasDiscount}`);

    queryArray.push(`Page=${parsedPagination.page}`);
    queryArray.push(`PageSize=${parsedPagination.pageSize}`);

    const queryString: string = queryArray.join("&");
    const backendResponse = await fetch(
      `${process.env.API_URL}/user/vehicle-models${queryString === "" ? "" : `?${queryString}`}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const data: tSuccessManyModel<tVehicleModelModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tVehicleModelModel>>(data, {
      status: backendResponse.status,
    });
  });
}
