import { NextRequest, NextResponse } from "next/server";

import { ZodError } from "zod/v4";
import { tVehicleFilter, zVehicleFilter } from "@/validations/[user]/[vehicles]/vehicle-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import {
  tSuccessManyModel,
  tFailedModel,
  ClsErrorModel,
  tResponseManyModel,
} from "@/models/response";

import { tVehicleModel } from "@/models/vehicle";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tVehicleModel>>> {
  try {
    let {
      filters,
      pagination,
    }: { filters: tVehicleFilter; pagination: tPagination } = {
      filters: {
        search: request.nextUrl.searchParams.get("search") || "",
        transmission: request.nextUrl.searchParams.get("transmission") || "",
        fuel: request.nextUrl.searchParams.get("fuel") || "",
        minCapacity: Number(
          request.nextUrl.searchParams.get("minCapacity") || 0,
        ),
        maxCapacity: Number(
          request.nextUrl.searchParams.get("maxCapacity") || 0,
        ),
        minPrice: Number(request.nextUrl.searchParams.get("minPrice") || 0),
        maxPrice: Number(request.nextUrl.searchParams.get("maxPrice") || 0),
        hasDiscount: Boolean(request.nextUrl.searchParams.get("hasDiscount")),
      },
      pagination: {
        page: Number(request.nextUrl.searchParams.get("page")),
        limit: Number(request.nextUrl.searchParams.get("limit")),
      },
    };

    filters = zVehicleFilter.parse(filters);
    pagination = zPagination.parse(pagination);

    const queryArray = [];
    if (filters.search !== "")
      queryArray.push(`Search.Value=${filters.search}`);
    if (filters.transmission !== "")
      queryArray.push(`Transmission.Value=${filters.transmission}`);
    if (filters.fuel !== "") queryArray.push(`Fuel.Value=${filters.fuel}`);

    if (filters.minCapacity !== 0)
      queryArray.push(`MinCapacity.Value=${filters.minCapacity}`);
    if (filters.maxCapacity !== 0)
      queryArray.push(`MaxCapacity.Value=${filters.maxCapacity}`);

    if (filters.minPrice !== 0)
      queryArray.push(`MinPrice.Value=${filters.minPrice}`);
    if (filters.maxPrice !== 0)
      queryArray.push(`MaxPrice.Value=${filters.maxPrice}`);

    if (filters.hasDiscount !== false)
      queryArray.push(`HasDiscount.Value=${filters.hasDiscount}`);

    queryArray.push(`Page=${pagination.page}`);
    queryArray.push(`Limit=${pagination.limit}`);

    let queryString = queryArray.join("&");
    queryString = queryString === "" ? "" : `?${queryString}`;

    const apiResponse = await fetch(
      `${process.env.API_URL}/user/vehicles${queryString}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (apiResponse.ok === false) {
      const apiResponseBody: tFailedModel = await apiResponse.json();
      throw new ClsErrorModel(
        apiResponseBody.statusCode,
        apiResponseBody.message,
        apiResponseBody.issues,
      );
    }

    const apiResponseBody: tSuccessManyModel<tVehicleModel> =
      await apiResponse.json();

    return new NextResponse<tSuccessManyModel<tVehicleModel>>(
      JSON.stringify(apiResponseBody),
      {
        status: apiResponse.status,
      },
    );
  } catch (error: unknown) {
    if (error instanceof ZodError)
      return NextResponse.json(
        {
          statusCode: 400,
          message: error.message,
          issues: error.issues.map((issue) => ({
            field: issue.path[0].toString(),
            message: issue.message,
          })),
        } satisfies tFailedModel,
        { status: 400 },
      );

    if (error instanceof ClsErrorModel)
      return NextResponse.json(
        {
          statusCode: error.statusCode,
          message: error.message,
          issues: error.issues,
        } satisfies tFailedModel,
        { status: error.statusCode },
      );

    if (error instanceof Error)
      return NextResponse.json(
        {
          statusCode: 500,
          message: error.message,
          issues: [],
        } satisfies tFailedModel,
        { status: 500 },
      );

    return NextResponse.json(
      {
        statusCode: 500,
        message: "Unknown error",
        issues: [],
      } satisfies tFailedModel,
      { status: 500 },
    );
  }
}
