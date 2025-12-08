import { NextRequest, NextResponse } from "next/server";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import { zUuid } from "@/validations/uuid";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsErrorModel } from "@/models/failed";
import { tResponseOneModel } from "@/models/response";

import { apiCatcher } from "@/utilities/api";

export async function GET(
  _: NextRequest,
  context: RouteContext<"/api/user/vehicle-models/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tVehicleModelModel>>> {
  return await apiCatcher(async () => {
    const { uuid } = await context.params;
    const parsedUuid = zUuid.parse(uuid);

    const data = await fetch(
      `${process.env.API_URL}/user/vehicle-models/${parsedUuid}`,
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
     
      throw new ClsErrorModel(
        dataBody.statusCode,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tVehicleModelModel> = await data.json();
    return NextResponse.json<tSuccessOneModel<tVehicleModelModel>>(dataBody, {
      status: data.status,
    });
  });
}
