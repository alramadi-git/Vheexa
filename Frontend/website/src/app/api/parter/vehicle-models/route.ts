import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tFailedModel, ClsFailedModel } from "@/models/failed";

import { tVehicleModelModel } from "@/models/partner/vehicle-model";
import { tSuccessManyModel } from "@/models/success";

export async function GET(request: NextRequest) {
  return apiCatcher(async () => {
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
      request.nextUrl.searchParams.get("vehicle-model-filter.capacity.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.capacity.max"),
      request.nextUrl.searchParams.get("vehicle-model-filter.price.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.price.max"),
      request.nextUrl.searchParams.get("vehicle-model-filter.discount.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.discount.max"),
      request.nextUrl.searchParams.get("pagination.page"),
      request.nextUrl.searchParams.get("pagination.page-size"),
    ];

    const filter: tVehicleModelFilter = {
      search:
        request.nextUrl.searchParams.get("vehicle-model-filter.search") ??
        undefined,
      modelYears: request.nextUrl.searchParams
        .getAll("vehicle-model-filter.model-years")
        .map((modelYear) => Number(modelYear)),
      capacity: {
        min: minCapacity !== undefined ? Number(minCapacity) : undefined,
        max: maxCapacity !== undefined ? Number(maxCapacity) : undefined,
      },
      transmissions: request.nextUrl.searchParams
        .getAll("vehicle-model-filter.transmissions")
        .map((transmission) => Number(transmission)),
      fuels: request.nextUrl.searchParams
        .getAll("vehicle-model-filter.model-years")
        .map((fuel) => Number(fuel)),
      colors: request.nextUrl.searchParams.getAll(
        "vehicle-model-filter.colors",
      ),
      price: {
        min: minPrice !== undefined ? Number(minPrice) : undefined,
        max: maxPrice !== undefined ? Number(maxPrice) : undefined,
      },
      discount: {
        min: minDiscount !== undefined ? Number(minDiscount) : undefined,
        max: maxDiscount !== undefined ? Number(maxDiscount) : undefined,
      },
      statuses: request.nextUrl.searchParams
        .getAll("vehicle-model-filter.statuses")
        .map((status) => Number(status)),
    };
    const pagination: tPagination = {
      page: page !== undefined ? Number(page) : undefined,
      pageSize: pageSize !== undefined ? Number(pageSize) : undefined,
    };

    const parsedFilter = zVehicleModelFilter.parse(filter);
    const parsedPagination = zPagination.parse(pagination);

    const clsQuery = new ClsQuery();

    clsQuery.set("VehicleModelFilter.Search.Value", parsedFilter.search);

    clsQuery.setMany(
      "VehicleModelFilter.ModelYear.Value",
      parsedFilter.modelYears.map((modelYear) => modelYear.toString()),
    );

    clsQuery.set(
      "VehicleModelFilter.Capacity.Min.Value",
      parsedFilter.capacity.min?.toString(),
    );
    clsQuery.set(
      "VehicleModelFilter.Capacity.Max.Value",
      parsedFilter.capacity.max?.toString(),
    );

    clsQuery.setMany(
      "VehicleModelFilter.Transmissions.Value",
      parsedFilter.transmissions.map((transmission) => transmission.toString()),
    );

    clsQuery.setMany(
      "VehicleModelFilter.Fuels.Value",
      parsedFilter.fuels.map((fuel) => fuel.toString()),
    );

    clsQuery.setMany("VehicleModelFilter.Colors.Value", parsedFilter.colors);

    clsQuery.set(
      "VehicleModelFilter.Price.Min.Value",
      parsedFilter.price.min?.toString(),
    );
    clsQuery.set(
      "VehicleModelFilter.Price.Max.Value",
      parsedFilter.price.max?.toString(),
    );

    clsQuery.set(
      "VehicleModelFilter.Discount.Min.Value",
      parsedFilter.discount.min?.toString(),
    );
    clsQuery.set(
      "VehicleModelFilter.Discount.Max.Value",
      parsedFilter.discount.max?.toString(),
    );

    clsQuery.setMany(
      "VehicleModelFilter.Statuses.Value",
      parsedFilter.statuses.map((status) => status.toString()),
    );

    clsQuery.set("pagination.Page.Value", parsedPagination.page?.toString());
    clsQuery.set(
      "pagination.PageSize.Value",
      parsedPagination.pageSize?.toString(),
    );

    const token = request.cookies.get("partner-token");
    const data = await clsFetch.get(
      `/partner/vehicle-models${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
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
    return NextResponse.json(dataBody, { status: data.status });
  });
}
