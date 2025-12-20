import { NextRequest, NextResponse } from "next/server";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import { zUuid } from "@/validations/uuid";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

import { apiCatch } from "@/utilities/api";

export async function GET(
  _: NextRequest,
  context: RouteContext<"/api/user/vehicle-models/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tVehicleModelModel>>> {
  return await apiCatch<tVehicleModelModel>(async () => {
    const { uuid } = await context.params;
    const parsedUuid = zUuid.parse(uuid);

    const backendResponse = await fetch(
      `${process.env.API_URL}/user/vehicle-models/${parsedUuid}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
        },
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const data: tSuccessOneModel<tVehicleModelModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tVehicleModelModel>>(data, {
      status: backendResponse.status,
    });
  });
}
