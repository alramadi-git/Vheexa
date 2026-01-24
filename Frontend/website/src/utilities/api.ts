import "server-only";

import { NextResponse } from "next/server";

import { ClsErrorModel } from "@/models/error";

import { tSuccessModel, tPaginationSuccessModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

async function apiCatch<tData>(
  callback: () => Promise<NextResponse<tSuccessModel<tData>>>,
): Promise<NextResponse<tResponseOneModel<tData>>>;
async function apiCatch<tData>(
  callback: () => Promise<NextResponse<tPaginationSuccessModel<tData>>>,
): Promise<NextResponse<tResponseManyModel<tData>>>;
async function apiCatch<tData>(
  callback: () => Promise<
    | NextResponse<tSuccessModel<tData>>
    | NextResponse<tPaginationSuccessModel<tData>>
  >,
): Promise<NextResponse<tResponseOneModel<tData> | tResponseManyModel<tData>>> {
  try {
    return await callback();
  } catch (error: unknown) {
    const statusCode = error instanceof ClsErrorModel ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return new NextResponse(message, { status: statusCode });
  }
}

export { apiCatch };
