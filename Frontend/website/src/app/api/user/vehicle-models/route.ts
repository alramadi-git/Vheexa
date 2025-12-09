import { NextRequest, NextResponse } from "next/server";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import {
  tVehicleFilter,
  zVehicleFilter,
} from "@/validations/user/vehicles/vehicle-filter";
import { ePageSize, tPagination, zPagination } from "@/validations/pagination";

import { tSuccessManyModel } from "@/models/success";
import { tFailedModel, ClsFailedModel } from "@/models/failed";
import { tResponseManyModel } from "@/models/response";

import { apiCatcher } from "@/utilities/api";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tVehicleModelModel>>> {
  return await apiCatcher(async () => {
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
    const data = await fetch(
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

    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();

      throw new ClsFailedModel(
        dataBody.statusCode,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessManyModel<tVehicleModelModel> = await data.json();
    return NextResponse.json<tSuccessManyModel<tVehicleModelModel>>(dataBody, {
      status: data.status,
    });
  });
}
