import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tNullable } from "@/types/nullish";

import { tJwt } from "@/validations/jwt";

import { tBranchFilter, zBranchFilter } from "@/validations/partner/branch";
import { tPagination, zPagination } from "@/validations/pagination";

import { zBranchCreate } from "@/validations/partner/branch";

import { eBranchStatusModel, tBranchModel } from "@/models/partner/branch";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tBranchModel>>> {
  return await apiCatch<tBranchModel>(async () => {
    const [status, page, pageSize]: tNullable<string>[] = [
      request.nextUrl.searchParams.get("filter.status"),
      request.nextUrl.searchParams.get("pagination.page"),
      request.nextUrl.searchParams.get("pagination.page-size"),
    ];

    const filter: tBranchFilter = {
      search: request.nextUrl.searchParams.get("filter.search") ?? undefined,
      status: status !== null ? Number(status) : undefined,
    };
    const pagination: tPagination = {
      page: page === null ? undefined : Number(page),
      pageSize: pageSize === null ? undefined : Number(pageSize),
    };

    const parsedFilter: tBranchFilter = zBranchFilter.parse(filter);
    const parsedPagination: tPagination = zPagination.parse(pagination);

    const clsQuery: ClsQuery = new ClsQuery();

    clsQuery.set("Filter.Search", parsedFilter.search);

    clsQuery.set("Filter.Status.Value", parsedFilter.status?.toString());

    clsQuery.set("Pagination.Page.Value", parsedPagination.page?.toString());
    clsQuery.set(
      "Pagination.PageSize.Value",
      parsedPagination.pageSize?.toString(),
    );

    return NextResponse.json<tSuccessManyModel<tBranchModel>>({
      data: [
        {
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
        {
          uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
          country: "Germany",
          city: "Berlin",
          street: "Friedrichstraße 68",
          latitude: 52.52,
          longitude: 13.405,
          name: "Berlin Mitte Hub",
          phoneNumber: "+49 30 55578901",
          email: "berlin.mitte@partnerfleet.eu",
          vehicleInstanceCount: 35,
          memberCount: 15,
          status: eBranchStatusModel.active,
          createdAt: "2023-08-05T09:15:00Z",
          updatedAt: "2024-10-18T11:40:22Z",
        },
        {
          uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
          country: "Canada",
          city: "Toronto",
          street: "123 Queen St W",
          latitude: 43.6532,
          longitude: -79.3832,
          name: "Toronto Financial District",
          phoneNumber: "+1 416-555-0134",
          email: "toronto.fd@partnerfleet.ca",
          vehicleInstanceCount: 28,
          memberCount: 12,
          status: eBranchStatusModel.active,
          createdAt: "2023-11-20T13:45:00Z",
          updatedAt: "2024-12-01T09:30:15Z",
        },
        {
          uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
          country: "Australia",
          city: "Sydney",
          street: "456 George St",
          latitude: -33.8688,
          longitude: 151.2093,
          name: "Sydney Central Branch",
          phoneNumber: "+61 2 5550 1923",
          email: "sydney.central@partnerfleet.com.au",
          vehicleInstanceCount: 22,
          memberCount: 10,
          status: eBranchStatusModel.inactive,
          createdAt: "2023-05-18T08:20:00Z",
          updatedAt: "2024-09-10T16:05:30Z",
        },
        {
          uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
          country: "United Arab Emirates",
          city: "Dubai",
          street: "Sheikh Zayed Rd, Business Bay",
          latitude: 25.1972,
          longitude: 55.2744,
          name: "Dubai Business Bay Office",
          phoneNumber: "+971 4 555 0187",
          email: "dubai.bb@partnerfleet.ae",
          vehicleInstanceCount: 50,
          memberCount: 22,
          status: eBranchStatusModel.active,
          createdAt: "2024-01-10T11:00:00Z",
          updatedAt: "2024-12-05T10:15:45Z",
        },
        {
          uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
          country: "Brazil",
          city: "São Paulo",
          street: "Av. Paulista, 1000",
          latitude: -23.5505,
          longitude: -46.6333,
          name: "São Paulo Paulista Branch",
          phoneNumber: "+55 11 5555-0176",
          email: "saopaulo.paulista@partnerfleet.br",
          vehicleInstanceCount: 38,
          memberCount: 16,
          status: eBranchStatusModel.inactive,
          createdAt: "2023-07-22T15:30:00Z",
          updatedAt: "2024-08-14T13:20:00Z",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 6 },
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/branches${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessManyModel<tBranchModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tBranchModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const branchCreate = await request.json();
    const parsedBranchCreate = zBranchCreate.parse(branchCreate);

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: 201 },
    );

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.post(
      `/partner/dashboard/branches/`,
      {
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(parsedBranchCreate),
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
