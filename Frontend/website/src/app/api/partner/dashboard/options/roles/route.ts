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
          uuid: "a9c8d7e6-5f4b-4a3c-8d2e-0f1b2c3d4e5f",
          name: "Owner",
        },
        {
          uuid: "b1e7f5d2-3f4a-4c6e-9f28-1a2b3c4d5e6f",
          name: "Manager",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 2 },
    });

    const token: string = request.cookies.get("partner-token")!.value;
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

    const response: tSuccessManyModel<tOptionModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tOptionModel>>(response, {
      status: backendResponse.status,
    });
  });
}
