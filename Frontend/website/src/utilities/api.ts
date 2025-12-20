import "server-only";

import { NextResponse } from "next/server";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

async function apiCatch<tData>(
  callback: () => Promise<NextResponse<tSuccessOneModel<tData>>>,
): Promise<NextResponse<tResponseOneModel<tData>>>;
async function apiCatch<tData>(
  callback: () => Promise<NextResponse<tSuccessManyModel<tData>>>,
): Promise<NextResponse<tResponseManyModel<tData>>>;
async function apiCatch<tData>(
  callback: () => Promise<
    | NextResponse<tSuccessOneModel<tData>>
    | NextResponse<tSuccessManyModel<tData>>
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
