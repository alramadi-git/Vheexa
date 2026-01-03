import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tNullable } from "@/types/nullish";

import { tJwt } from "@/validations/jwt";

import { tRoleFilter, zRoleFilter } from "@/validations/partner/role";
import { tPagination, zPagination } from "@/validations/pagination";

import { zRoleCreate } from "@/validations/partner/role";

import { eRoleStatusModel, tRoleModel } from "@/models/partner/role";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tRoleModel>>> {
  return await apiCatch<tRoleModel>(async () => {
    const [status, page, pageSize]: tNullable<string>[] = [
      request.nextUrl.searchParams.get("filter.status"),
      request.nextUrl.searchParams.get("pagination.page"),
      request.nextUrl.searchParams.get("pagination.page-size"),
    ];

    const filter: tRoleFilter = {
      name: request.nextUrl.searchParams.get("filter.name") ?? undefined,
      permissions: request.nextUrl.searchParams
        .getAll("filter.permissions")
        .map((permission) => Number(permission)),
      status: status !== null ? Number(status) : undefined,
    };
    const pagination: tPagination = {
      page: page === null ? undefined : Number(page),
      pageSize: pageSize === null ? undefined : Number(pageSize),
    };

    const parsedFilter: tRoleFilter = zRoleFilter.parse(filter);
    const parsedPagination: tPagination = zPagination.parse(pagination);

    const clsQuery: ClsQuery = new ClsQuery();

    clsQuery.set("Filter.Name.Value", parsedFilter.name);

    clsQuery.set(
      "Filter.Permissions.Value",
      parsedFilter.permissions.map((permission) => permission.toString()),
    );

    clsQuery.set("Filter.Status.Value", parsedFilter.status?.toString());

    clsQuery.set("Pagination.Page.Value", parsedPagination.page?.toString());
    clsQuery.set(
      "Pagination.PageSize.Value",
      parsedPagination.pageSize?.toString(),
    );

    return NextResponse.json<tSuccessManyModel<tRoleModel>>({
      data: [
        {
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
        {
          uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
          name: "HR Specialist",
          permissions: [
            {
              uuid: "a6f1e2d3-c4b5-9b2c-4d3e-5f6a7b8c9d0e",
              name: "Members Create",
              description: "Add new team members to the organization.",
            },
            {
              uuid: "9f1e2d3c-4b5a-0c3d-5e4f-6a7b8c9d0e1f",
              name: "Members Read",
              description: "View all member profiles and roles.",
            },
            {
              uuid: "8e2d3c4b-5a6f-1d4e-6f5a-7b8c9d0e1f2a",
              name: "Members Update",
              description:
                "Edit member contact info, status, or role assignment.",
            },
            {
              uuid: "7d3c4b5a-6f1e-2e5f-7a6b-8c9d0e1f2a3b",
              name: "Members Delete",
              description:
                "Remove members from the system (soft or hard delete).",
            },
          ],
          assignedCount: 3,
          status: eRoleStatusModel.active,
          createdAt: "2024-02-10T09:15:00Z",
          updatedAt: "2024-10-05T11:40:22Z",
        },
        {
          uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
          name: "Branch Coordinator",
          permissions: [
            {
              uuid: "6c4b5a6f-1e2d-3f6a-8b7c-9d0e1f2a3b4c",
              name: "Branches Create",
              description: "Create new physical or service branches.",
            },
            {
              uuid: "5b5a6f1e-2d3c-4a7b-9c8d-0e1f2a3b4c5d",
              name: "Branches Read",
              description: "View all branch details, locations, and status.",
            },
            {
              uuid: "4a6f1e2d-3c4b-5b8c-0d9e-1f2a3b4c5d6e",
              name: "Branches Update",
              description:
                "Modify branch address, contact, or operational settings.",
            },
            {
              uuid: "3f1e2d3c-4b5a-6c9d-1e0f-2a3b4c5d6e7f",
              name: "Branches Delete",
              description: "Deactivate or remove branches from the system.",
            },
          ],
          assignedCount: 5,
          status: eRoleStatusModel.active,
          createdAt: "2023-12-01T14:30:00Z",
          updatedAt: "2024-12-02T09:10:45Z",
        },
        {
          uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
          name: "Partner Administrator",
          permissions: [
            {
              uuid: "2e2d3c4b-5a6f-7d0e-2f1a-3b4c5d6e7f8a",
              name: "Partner Update",
              description:
                "Modify partner organization profile and configuration.",
            },
            {
              uuid: "1d3c4b5a-6f1e-8e1f-3a2b-4c5d6e7f8a9b",
              name: "Roles Create",
              description: "Define new custom roles for the partner.",
            },
            {
              uuid: "0c4b5a6f-1e2d-9f2a-4b3c-5d6e7f8a9b0c",
              name: "Roles Read",
              description: "View all role definitions and assignments.",
            },
            {
              uuid: "fb5a6f1e-2d3c-0a3b-5c4d-6e7f8a9b0c1d",
              name: "Branches Read",
              description: "Access all branch data.",
            },
            {
              uuid: "ea6f1e2d-3c4b-1b4c-6d5e-7f8a9b0c1d2e",
              name: "Members Read",
              description: "View all team members across branches.",
            },
            {
              uuid: "da7f1e2d-4c5b-2c5d-7e6f-8a9b0c1d2e3f",
              name: "Vehicle Models Read",
              description: "Access full vehicle model catalog.",
            },
            {
              uuid: "ca8f1e2d-5c6b-3d6e-8f7a-9b0c1d2e3f4a",
              name: "Vehicle Instances Read",
              description: "Monitor entire fleet status and history.",
            },
          ],
          assignedCount: 2,
          status: eRoleStatusModel.active,
          createdAt: "2023-09-18T08:00:00Z",
          updatedAt: "2024-11-15T16:22:30Z",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 4 },
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/roles${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessManyModel<tRoleModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tRoleModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const roleCreate = await request.json();
    const parsedRoleCreate = zRoleCreate.parse(roleCreate);

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: 201 },
    );

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.post(
      `/partner/dashboard/roles/`,
      {
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(parsedRoleCreate),
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
