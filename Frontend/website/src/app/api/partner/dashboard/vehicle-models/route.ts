import { NextRequest, NextResponse } from "next/server";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { apiCatcher } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import {
  eVehicleModelStatusModel,
  tVehicleModelModel,
} from "@/models/partner/vehicle-model";
import { tSuccessManyModel, tSuccessOneModel } from "@/models/success";
import { tResponseManyModel } from "@/models/response";
import { zVehicleModelCreate } from "@/validations/partner/vehicle-model-create";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tVehicleModelModel>>> {
  return await apiCatcher<tVehicleModelModel>(async () => {
    const [
      minCapacity,
      maxCapacity,
      minPrice,
      maxPrice,
      minDiscount,
      maxDiscount,
      page,
      pageSize,
    ]: (string | null)[] = [
      request.nextUrl.searchParams.get("vehicle-model-filter.capacity.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.capacity.max"),
      request.nextUrl.searchParams.get("vehicle-model-filter.price.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.price.max"),
      request.nextUrl.searchParams.get("vehicle-model-filter.discount.min"),
      request.nextUrl.searchParams.get("vehicle-model-filter.discount.max"),
      request.nextUrl.searchParams.get("pagination.page"),
      request.nextUrl.searchParams.get("pagination.page-size"),
    ];

    const VehicleModelFilter: tVehicleModelFilter = {
      search:
        request.nextUrl.searchParams.get("vehicle-model-filter.search") ??
        undefined,
      capacity: {
        min: minCapacity === null ? undefined : Number(minCapacity),
        max: maxCapacity === null ? undefined : Number(maxCapacity),
      },
      transmissions: request.nextUrl.searchParams.getAll(
        "vehicle-model-filter.transmissions",
      ),
      fuels: request.nextUrl.searchParams.getAll(
        "vehicle-model-filter.model-years",
      ),
      colors: request.nextUrl.searchParams.getAll(
        "vehicle-model-filter.colors",
      ),
      price: {
        min: minPrice === null ? undefined : Number(minPrice),
        max: maxPrice === null ? undefined : Number(maxPrice),
      },
      discount: {
        min: minDiscount === null ? undefined : Number(minDiscount),
        max: maxDiscount === null ? undefined : Number(maxDiscount),
      },
      statuses: request.nextUrl.searchParams
        .getAll("vehicle-model-filter.statuses")
        .map((status) => Number(status)),
    };
    const pagination: tPagination = {
      page: page === null ? undefined : Number(page),
      pageSize: pageSize === null ? undefined : Number(pageSize),
    };

    const parsedFilter: tVehicleModelFilter =
      zVehicleModelFilter.parse(VehicleModelFilter);
    const parsedPagination: tPagination = zPagination.parse(pagination);

    const clsQuery: ClsQuery = new ClsQuery();
    clsQuery.set("VehicleModelFilter.Search.Value", parsedFilter.search);

    clsQuery.set(
      "VehicleModelFilter.Capacity.Min.Value",
      parsedFilter.capacity.min?.toString(),
    );
    clsQuery.set(
      "VehicleModelFilter.Capacity.Max.Value",
      parsedFilter.capacity.max?.toString(),
    );

    clsQuery.set(
      "VehicleModelFilter.Transmissions.Value",
      parsedFilter.transmissions,
    );

    clsQuery.set("VehicleModelFilter.Fuels.Value", parsedFilter.fuels);

    clsQuery.set("VehicleModelFilter.Colors.Value", parsedFilter.colors);

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

    clsQuery.set(
      "VehicleModelFilter.Statuses.Value",
      parsedFilter.statuses.map((status) => status.toString()),
    );

    clsQuery.set("Pagination.Page.Value", parsedPagination.page?.toString());
    clsQuery.set(
      "Pagination.PageSize.Value",
      parsedPagination.pageSize?.toString(),
    );

    return NextResponse.json({
      data: [
        {
          uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          category: 0,
          thumbnail: {
            uuid: "a3d9e2b1-4f5c-4e8a-9b2d-1c6e7f8a9b2c",
            url: "https://example.com/images/thumbnails/model_s.jpg",
          },
          gallery: [
            {
              uuid: "b4e8f1a2-3d9c-4e7f-8a9b-2c1d3e4f5a6b",
              url: "https://example.com/images/side.jpg",
              index: 0,
            },
            {
              uuid: "c5f9g2b3-4e8d-5f6g-7h8i-3j4k5l6m7n8o",
              url: "https://example.com/images/interior.jpg",
              index: 1,
            },
          ],
          name: "Model S",
          description:
            "Luxury electric sedan with long-range battery and autopilot.",
          manufacturer: "Tesla",
          modelYear: 2025,
          capacity: 5,
          transmission: "Automatic",
          fuel: "Electric",
          colors: [
            {
              uuid: "d6h1i2j3-4k5l-6m7n-8o9p-1q2r3s4t5u6v",
              name: "Pearl White",
              hexCode: "#FFFFFF",
              tags: "premium, white, popular",
            },
            {
              uuid: "e7j2k3l4-5m6n-7o8p-9q1r-2s3t4u5v6w7x",
              name: "Midnight Black",
              hexCode: "#000000",
              tags: "standard, black, sleek",
            },
          ],
          price: 180,
          discount: 30,
          tags: "electric, luxury, sedan, high-performance",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-10T08:45:00Z",
          createdAt: "2025-01-15T12:00:00Z",
        },
        {
          uuid: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
          category: 0,
          thumbnail: {
            uuid: "f8g9h1i2-3j4k-5l6m-7n8o-9p1q2r3s4t5u",
            url: "https://example.com/images/thumbnails/civic.jpg",
          },
          gallery: [
            {
              uuid: "g9h1i2j3-4k5l-6m7n-8o9p-1q2r3s4t5u6v",
              url: "https://example.com/images/civic_front.jpg",
              index: 0,
            },
            {
              uuid: "h1i2j3k4-5l6m-7n8o-9p1q-2r3s4t5u6v7w",
              url: "https://example.com/images/civic_back.jpg",
              index: 1,
            },
          ],
          name: "Civic LX",
          description:
            "Reliable compact car with excellent fuel economy and modern design.",
          manufacturer: "Honda",
          modelYear: 2025,
          capacity: 5,
          transmission: "Manual",
          fuel: "Petrol 95",
          colors: [
            {
              uuid: "i2j3k4l5-6m7n-8o9p-1q2r-3s4t5u6v7w8x",
              name: "Crystal Blue",
              hexCode: "#0F8BFF",
              tags: "metallic, blue, cool",
            },
            {
              uuid: "j3k4l5m6-7n8o-9p1q-2r3s-4t5u6v7w8x9y",
              name: "Urban Gray",
              hexCode: "#808080",
              tags: "standard, gray, neutral",
            },
          ],
          price: 65,
          discount: 0,
          tags: "sedan, compact, fuel-efficient, reliable",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-08T14:22:00Z",
          createdAt: "2025-01-10T09:15:00Z",
        },
        {
          uuid: "b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9",
          category: 0,
          thumbnail: {
            uuid: "k4l5m6n7-8o9p-1q2r-3s4t-5u6v7w8x9y0z",
            url: "https://example.com/images/thumbnails/m3.jpg",
          },
          gallery: [
            {
              uuid: "l5m6n7o8-9p1q-2r3s-4t5u-6v7w8x9y0z1a",
              url: "https://example.com/images/m3_side.jpg",
              index: 0,
            },
          ],
          name: "M3 Competition",
          description:
            "High-performance luxury sports sedan with rear-wheel drive dynamics.",
          manufacturer: "BMW",
          modelYear: 2025,
          capacity: 5,
          transmission: "Dual Clutch",
          fuel: "Petrol 98",
          colors: [
            {
              uuid: "m6n7o8p9-1q2r-3s4t-5u6v-7w8x9y0z1a2b",
              name: "Imola Red",
              hexCode: "#D40000",
              tags: "premium, red, performance",
            },
          ],
          price: 220,
          discount: 0,
          tags: "performance, luxury, sports, coupe",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-07T11:30:00Z",
          createdAt: "2025-01-05T16:45:00Z",
        },
        {
          uuid: "c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0",
          category: 0,
          thumbnail: {
            uuid: "n7o8p9q1-2r3s-4t5u-6v7w-8x9y0z1a2b3c",
            url: "https://example.com/images/thumbnails/golf.jpg",
          },
          gallery: [
            {
              uuid: "o8p9q1r2-3s4t-5u6v-7w8x-9y0z1a2b3c4d",
              url: "https://example.com/images/golf_exterior.jpg",
              index: 0,
            },
          ],
          name: "Golf GTI",
          description:
            "Iconic hot hatch with sport-tuned suspension and turbocharged engine.",
          manufacturer: "Volkswagen",
          modelYear: 2025,
          capacity: 5,
          transmission: "Semi-Automatic",
          fuel: "Petrol 95",
          colors: [
            {
              uuid: "p9q1r2s3-4t5u-6v7w-8x9y-0z1a2b3c4d5e",
              name: "Lapiz Blue",
              hexCode: "#2A5CAA",
              tags: "metallic, blue, sporty",
            },
          ],
          price: 95,
          discount: 15,
          tags: "hot hatch, sport, compact, fun-to-drive",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-06T10:10:00Z",
          createdAt: "2025-01-04T14:30:00Z",
        },
        {
          uuid: "d4e5f6g7-h8i9-0123-j4k5-l6m7n8o9p0q1",
          category: 0,
          thumbnail: {
            uuid: "q1r2s3t4-5u6v-7w8x-9y0z-1a2b3c4d5e6f",
            url: "https://example.com/images/thumbnails/camry.jpg",
          },
          gallery: [
            {
              uuid: "r2s3t4u5-6v7w-8x9y-0z1a-2b3c4d5e6f7g",
              url: "https://example.com/images/camry_interior.jpg",
              index: 0,
            },
          ],
          name: "Camry SE",
          description:
            "Midsize family sedan known for reliability and comfort.",
          manufacturer: "Toyota",
          modelYear: 2025,
          capacity: 5,
          transmission: "CVT",
          fuel: "Hybrid",
          colors: [
            {
              uuid: "s3t4u5v6-7w8x-9y0z-1a2b-3c4d5e6f7g8h",
              name: "Silver Metallic",
              hexCode: "#C0C0C0",
              tags: "standard, silver, durable",
            },
          ],
          price: 75,
          discount: 10,
          tags: "sedan, hybrid, reliable, family",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-05T09:20:00Z",
          createdAt: "2025-01-03T11:00:00Z",
        },
        {
          uuid: "e5f6g7h8-i9j0-1234-k5l6-m7n8o9p0q1r2",
          category: 0,
          thumbnail: {
            uuid: "t4u5v6w7-8x9y-0z1a-2b3c-4d5e6f7g8h9i",
            url: "https://example.com/images/thumbnails/forester.jpg",
          },
          gallery: [
            {
              uuid: "u5v6w7x8-9y0z-1a2b-3c4d-5e6f7g8h9i0j",
              url: "https://example.com/images/forester_offroad.jpg",
              index: 0,
            },
          ],
          name: "Forester Limited",
          description:
            "Compact SUV with standard all-wheel drive and spacious cabin.",
          manufacturer: "Subaru",
          modelYear: 2025,
          capacity: 5,
          transmission: "CVT",
          fuel: "Petrol 91",
          colors: [
            {
              uuid: "v6w7x8y9-1z2a-3b4c-5d6e-7f8g9h0i1j2k",
              name: "Sapphire Blue",
              hexCode: "#0F52BA",
              tags: "metallic, blue, outdoor",
            },
          ],
          price: 88,
          discount: 12,
          tags: "SUV, AWD, compact, outdoors",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-04T13:15:00Z",
          createdAt: "2025-01-02T10:20:00Z",
        },
        {
          uuid: "f6g7h8i9-j0k1-2345-l6m7-n8o9p0q1r2s3",
          category: 2,
          thumbnail: {
            uuid: "w7x8y9z0-1a2b-3c4d-5e6f-7g8h9i0j1k2l",
            url: "https://example.com/images/thumbnails/f150.jpg",
          },
          gallery: [
            {
              uuid: "x8y9z0a1-2b3c-4d5e-6f7g-8h9i0j1k2l3m",
              url: "https://example.com/images/f150_truckbed.jpg",
              index: 0,
            },
          ],
          name: "F-150 XLT",
          description:
            "Full-size pickup truck with powerful engine options and towing capability.",
          manufacturer: "Ford",
          modelYear: 2025,
          capacity: 5,
          transmission: "Automatic",
          fuel: "Diesel",
          colors: [
            {
              uuid: "y9z0a1b2-3c4d-5e6f-7g8h-9i0j1k2l3m4n",
              name: "Oxford White",
              hexCode: "#FFFFFF",
              tags: "standard, white, rugged",
            },
          ],
          price: 130,
          discount: 0,
          tags: "truck, diesel, towing, full-size",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-03T16:40:00Z",
          createdAt: "2025-01-01T08:30:00Z",
        },
        {
          uuid: "g7h8i9j0-k1l2-3456-m7n8-o9p0q1r2s3t4",
          category: 0,
          thumbnail: {
            uuid: "z0a1b2c3-4d5e-6f7g-8h9i-0j1k2l3m4n5o",
            url: "https://example.com/images/thumbnails/corvette.jpg",
          },
          gallery: [
            {
              uuid: "a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
              url: "https://example.com/images/corvette_race.jpg",
              index: 0,
            },
          ],
          name: "Corvette Stingray",
          description:
            "American mid-engine sports car with track-ready performance.",
          manufacturer: "Chevrolet",
          modelYear: 2025,
          capacity: 2,
          transmission: "Dual Clutch",
          fuel: "Petrol 98",
          colors: [
            {
              uuid: "b2c3d4e5-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
              name: "Velocity Yellow",
              hexCode: "#FFF700",
              tags: "premium, yellow, aggressive",
            },
          ],
          price: 290,
          discount: 30,
          tags: "sports car, performance, American, coupe",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-02T12:05:00Z",
          createdAt: "2024-12-31T14:10:00Z",
        },
        {
          uuid: "h8i9j0k1-l2m3-4567-n8o9-p0q1r2s3t4u5",
          category: 0,
          thumbnail: {
            uuid: "c3d4e5f6-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
            url: "https://example.com/images/thumbnails/xc90.jpg",
          },
          gallery: [
            {
              uuid: "d4e5f6g7-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
              url: "https://example.com/images/xc90_family.jpg",
              index: 0,
            },
          ],
          name: "XC90 Inscription",
          description:
            "Luxury three-row SUV with Scandinavian design and safety focus.",
          manufacturer: "Volvo",
          modelYear: 2025,
          capacity: 7,
          transmission: "Automatic",
          fuel: "Hybrid",
          colors: [
            {
              uuid: "e5f6g7h8-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
              name: "Charcoal Grey",
              hexCode: "#36454F",
              tags: "premium, grey, elegant",
            },
          ],
          price: 210,
          discount: 0,
          tags: "luxury, SUV, hybrid, family, safe",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-03-01T10:50:00Z",
          createdAt: "2024-12-30T09:00:00Z",
        },
        {
          uuid: "i9j0k1l2-m3n4-5678-o9p0-q1r2s3t4u5v6",
          category: 0,
          thumbnail: {
            uuid: "f6g7h8i9-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
            url: "https://example.com/images/thumbnails/charger.jpg",
          },
          gallery: [
            {
              uuid: "g7h8i9j0-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
              url: "https://example.com/images/charger_muscle.jpg",
              index: 0,
            },
          ],
          name: "Charger R/T",
          description:
            "Classic American muscle car with powerful V8 engine and bold styling.",
          manufacturer: "Dodge",
          modelYear: 2025,
          capacity: 5,
          transmission: "Automatic",
          fuel: "Petrol 91",
          colors: [
            {
              uuid: "h8i9j0k1-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
              name: "Billet Silver",
              hexCode: "#C8C8C8",
              tags: "standard, silver, muscle",
            },
          ],
          price: 145,
          discount: 15,
          tags: "muscle car, V8, American, sedan",
          status: eVehicleModelStatusModel.active,
          updatedAt: "2025-02-28T14:30:00Z",
          createdAt: "2024-12-29T13:20:00Z",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 1 },
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/vehicle-models${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.json();
      throw new Error(errorText);
    }

    const response: tSuccessManyModel<tVehicleModelModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tVehicleModelModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tSuccessOneModel<null>>> {
  return apiCatcher(async () => {
    const vehicleModelCreate = await request.json();
    const parsedVehicleModelCreate =
      zVehicleModelCreate.parse(vehicleModelCreate);

    console.log("Parsed Vehicle Model Create:", parsedVehicleModelCreate);
    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: 201 },
    );

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.post(
      `/partner/dashboard/vehicle-models/`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.json();
      throw new Error(errorText);
    }

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: backendResponse.status },
    );
  });
}
