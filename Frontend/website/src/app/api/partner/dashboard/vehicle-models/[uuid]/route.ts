import { NextRequest, NextResponse } from "next/server";

import { tUuid, zUuid } from "@/validations/uuid";

import { apiCatcher } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import {
  eVehicleModelStatusModel,
  tVehicleModelModel,
} from "@/models/partner/vehicle-model";
import { tSuccessOneModel } from "@/models/success";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/vehicle-models/[uuid]">,
): Promise<NextResponse<tSuccessOneModel<tVehicleModelModel>>> {
  return apiCatcher(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<tVehicleModelModel>>({
      data: {
        uuid: parsedUuid,
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
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/vehicle-models/${parsedUuid}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.json();
      throw new Error(errorText);
    }

    const response: tSuccessOneModel<tVehicleModelModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tVehicleModelModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/vehicle-models/[uuid]">,
): Promise<NextResponse<tSuccessOneModel<null>>> {
  return apiCatcher(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<null>>({
      data: null,
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.delete(
      `/partner/dashboard/vehicle-models/${parsedUuid}`,
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
