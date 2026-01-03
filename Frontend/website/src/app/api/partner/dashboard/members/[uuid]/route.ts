import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import { tUuid, zUuid } from "@/validations/uuid";

import { tJwt } from "@/validations/jwt";

import { eRoleStatusModel } from "@/models/partner/role";
import { eBranchStatusModel } from "@/models/partner/branch";

import { eMemberStatusModel, tMemberModel } from "@/models/partner/member";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/members/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tMemberModel>>> {
  return await apiCatch<tMemberModel>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<tMemberModel>>({
      data: {
        uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        avatar: {
          uuid: "a1b2c3d4-1111-4aaa-9999-0e1f2a3b4c5d",
          url: "https://avatar.vercel.sh/james_wilson.svg?size=200",
        },
        location: {
          uuid: "b2c3d4e5-2222-4bbb-8888-1f2a3b4c5d6e",
          country: "United States",
          city: "Austin",
          street: "201 E 6th St",
          latitude: 30.267153,
          longitude: -97.743094,
        },
        username: "james.wilson",
        birthday: "1988-04-12",
        phoneNumber: "+1 512-555-0198",
        email: "james.wilson@partnerfleet.com",
        role: {
          uuid: "c3d4e5f6-3333-4ccc-7777-2a3b4c5d6e7f",
          name: "Vehicle Operator",
          permissions: [
            {
              uuid: "d4e5f6a7-4444-4ddd-6666-3b4c5d6e7f8a",
              name: "Vehicle Instances Create",
              description: "Register new vehicle units.",
            },
            {
              uuid: "e5f6a7b8-5555-4eee-5555-4c5d6e7f8a9b",
              name: "Vehicle Instances Update",
              description: "Update vehicle status or assignment.",
            },
          ],
          status: eRoleStatusModel.active,
          createdAt: "2024-03-15T10:20:00Z",
          updatedAt: "2024-11-28T14:35:10Z",
        },
        branch: {
          uuid: "f6a7b8c9-6666-4fff-4444-5d6e7f8a9b0c",
          country: "United States",
          city: "Austin",
          street: "201 E 6th St",
          latitude: 30.267153,
          longitude: -97.743094,
          name: "Austin Downtown Branch",
          phoneNumber: "+1 512-555-0198",
          email: "austin.downtown@partnerfleet.com",
          status: eBranchStatusModel.active,
          createdAt: "2023-06-12T10:30:00Z",
          updatedAt: "2024-11-30T14:22:10Z",
        },
        status: eMemberStatusModel.active,
        createdAt: "2024-01-10T08:30:00Z",
        updatedAt: "2024-12-01T09:15:22Z",
      },
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/members/${parsedUuid}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const data: tSuccessOneModel<tMemberModel> = await backendResponse.json();
    return NextResponse.json<tSuccessOneModel<tMemberModel>>(data, {
      status: backendResponse.status,
    });
  });
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/partner/dashboard/members/[uuid]">,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const { uuid } = await context.params;
    const parsedUuid: tUuid = zUuid.parse(uuid);

    return NextResponse.json<tSuccessOneModel<null>>({
      data: null,
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.delete(
      `/partner/dashboard/members/${parsedUuid}`,
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
