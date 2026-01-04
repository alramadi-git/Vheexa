import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import { tUuid, zUuid } from "@/validations/uuid";

import { eBranchStatusModel, tBranchModel } from "@/models/partner/branch";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";
import { ClsErrorModel } from "@/models/error";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/branches/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tBranchModel>>> {
  return await apiCatch<tBranchModel>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<tBranchModel>>({
      data: {
        uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        country: "United States",
        city: "Austin",
        street: "201 E 6th St",
        latitude: 30.2672,
        longitude: -97.7431,
        name: "Austin Downtown Branch",
        phoneNumber: "+1 512-555-0198",
        email: "austin.downtown@partnerfleet.com",
        vehicleInstanceCount: 42,
        memberCount: 18,
        status: eBranchStatusModel.active,
        createdAt: "2023-06-12T10:30:00Z",
        updatedAt: "2024-11-30T14:22:10Z",
      },
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/branches/${parsedUuid}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessOneModel<tBranchModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tBranchModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/branches/[uuid]">,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<null>>({
      data: null,
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.delete(
      `/partner/dashboard/branches/${parsedUuid}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: backendResponse.status },
    );
  });
}
