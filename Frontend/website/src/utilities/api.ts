import "server-only";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tFailedModel, ClsFailedModel } from "@/models/failed";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

async function apiCatcher<tData>(
  callback: () => Promise<
    | NextResponse<tSuccessOneModel<tData>>
    | NextResponse<tSuccessManyModel<tData>>
  >,
): Promise<NextResponse<tResponseOneModel<tData> | tResponseManyModel<tData>>> {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError)
      return NextResponse.json(
        {
          statusCode: 400,
          message: error.message,
          issues: error.issues.map((issue) => ({
            field: issue.path[0].toString(),
            message: issue.message,
          })),
        } satisfies tFailedModel,
        { status: 400 },
      );

    if (error instanceof ClsFailedModel)
      return NextResponse.json(
        {
          statusCode: error.statusCode,
          message: error.message,
          issues: error.issues,
        } satisfies tFailedModel,
        { status: error.statusCode },
      );

    if (error instanceof Error)
      return NextResponse.json(
        {
          statusCode: 500,
          message: error.message,
          issues: [],
        } satisfies tFailedModel,
        { status: 500 },
      );

    return NextResponse.json(
      {
        statusCode: 500,
        message: "Unknown error",
        issues: [],
      } satisfies tFailedModel,
      { status: 500 },
    );
  }
}

export { apiCatcher };
