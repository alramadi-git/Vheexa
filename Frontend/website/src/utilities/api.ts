import "server-only";

import { NextResponse } from "next/server";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

async function apiCatcher<tData>(
  callback: () => Promise<NextResponse<tSuccessOneModel<tData>>>,
): Promise<NextResponse<tResponseOneModel<tData>>>;
async function apiCatcher<tData>(
  callback: () => Promise<NextResponse<tSuccessManyModel<tData>>>,
): Promise<NextResponse<tResponseManyModel<tData>>>;
async function apiCatcher<tData>(
  callback: () => Promise<
    | NextResponse<tSuccessOneModel<tData>>
    | NextResponse<tSuccessManyModel<tData>>
  >,
): Promise<NextResponse<tResponseOneModel<tData> | tResponseManyModel<tData>>> {
  try {
    return await callback();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    return new NextResponse(message, { status: 500 });
  }
}

export { apiCatcher };
