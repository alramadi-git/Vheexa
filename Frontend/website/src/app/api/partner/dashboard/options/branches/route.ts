import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tPagination, zPagination } from "@/validations/pagination";

import { tUndefinable, tNullable } from "@/types/nullish";

import { tOptionModel } from "@/models/partner/option";

import { tSuccessManyModel } from "@/models/success";
import { tResponseManyModel } from "@/models/response";
import { ClsErrorModel } from "@/models/error";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tOptionModel>>> {
  return await apiCatch<tOptionModel>(async () => {
    const [pageQuery]: tNullable<string>[] = [
      request.nextUrl.searchParams.get("pagination.page"),
    ];

    const search: tUndefinable<string> =
      request.nextUrl.searchParams.get("filter.search") ?? undefined;

    const page: tUndefinable<tPagination["page"]> =
      pageQuery === null ? undefined : Number(pageQuery);

    const parsedSearch: tUndefinable<string> = search?.trim();
    const parsedPage: tUndefinable<tPagination["page"]> =
      zPagination.shape.page.parse(page);

    const clsQuery: ClsQuery = new ClsQuery();

    clsQuery.set("Filter.Search.Value", parsedSearch);

    clsQuery.set("Pagination.Page.Value", parsedPage?.toString());

    return NextResponse.json<tSuccessManyModel<tOptionModel>>({
      data: [
        {
          uuid: "8d3c9f1e-6f3a-4c2b-9a12-91c8c8c9a111",
          name: "Downtown HQ",
        },
        {
          uuid: "1f2a6c9d-9a1e-4d0b-8f1a-22b9d4a8c222",
          name: "Riverside Branch",
        },
        {
          uuid: "7c4d8a9e-3f1b-4c7a-9e2b-91d0e8a3b333",
          name: "West Logistics Hub",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 2 },
    });

    const token: string = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/options/branches${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessManyModel<tOptionModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tOptionModel>>(response, {
      status: backendResponse.status,
    });
  });
}
