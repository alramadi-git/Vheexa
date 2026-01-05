import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tUuid, zUuid } from "@/validations/uuid";

import { tJwt } from "@/validations/jwt";
import { tOptionModel } from "@/models/partner/option";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";
import { ClsErrorModel } from "@/models/error";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tOptionModel[]>>> {
  return await apiCatch<tOptionModel[]>(async () => {
    const uuids: string[] = request.nextUrl.searchParams.getAll("filter.uuids");
    const parsedUuids: tUuid[] = zUuid.array().parse(uuids);

    const clsQuery: ClsQuery = new ClsQuery();

    clsQuery.set("Filter.UUIDs.Value", parsedUuids);

    return NextResponse.json<tSuccessOneModel<tOptionModel[]>>({
      data: [
        {
          uuid: "a9c8d7e6-5f4b-4a3c-8d2e-0f1b2c3d4e5f",
          name: "Owner",
        },
        {
          uuid: "b1e7f5d2-3f4a-4c6e-9f28-1a2b3c4d5e6f",
          name: "Manager",
        },
      ].filter((role) => parsedUuids.some((uuid) => uuid === role.uuid)),
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/options/roles${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessOneModel<tOptionModel[]> =
      await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tOptionModel[]>>(response, {
      status: backendResponse.status,
    });
  });
}
