import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import { tUuid, zUuid } from "@/validations/uuid";

import { ClsErrorModel } from "@/models/error";

import { eRoleStatusModel, tRoleModel } from "@/models/partner/role";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/roles/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tRoleModel>>> {
  return await apiCatch<tRoleModel>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<tRoleModel>>({
      data: {
        uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        name: "Vehicle Operator",
        permissions: [
          {
            uuid: "f1e2d3c4-b5a6-4c7d-9e8f-0a1b2c3d4e5f",
            name: "Vehicle Models Create",
            description: "Add new vehicle models to the catalog.",
          },
          {
            uuid: "e2d3c4b5-a6f1-5d8e-0f9a-1b2c3d4e5f6a",
            name: "Vehicle Models Update",
            description: "Edit existing vehicle model specifications.",
          },
          {
            uuid: "d3c4b5a6-f1e2-6e9f-1a0b-2c3d4e5f6a7b",
            name: "Vehicle Instances Create",
            description: "Register new vehicle units into the fleet.",
          },
          {
            uuid: "c4b5a6f1-e2d3-7f0a-2b1c-3d4e5f6a7b8c",
            name: "Vehicle Instances Update",
            description:
              "Update status, location, or assignment of vehicle units.",
          },
          {
            uuid: "b5a6f1e2-d3c4-8a1b-3c2d-4e5f6a7b8c9d",
            name: "Vehicle Instances Read",
            description: "View all vehicle instance details and history.",
          },
        ],
        assignedCount: 8,
        status: eRoleStatusModel.active,
        createdAt: "2024-03-15T10:20:00Z",
        updatedAt: "2024-11-28T14:35:10Z",
      },
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/roles/${parsedUuid}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessOneModel<tRoleModel> = await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tRoleModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/roles/[uuid]">,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<null>>({
      data: null,
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.delete(
      `/partner/dashboard/roles/${parsedUuid}`,
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
