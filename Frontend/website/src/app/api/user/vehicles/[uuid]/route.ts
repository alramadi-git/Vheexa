import { ErrorModel, tFailedModel } from "@/models/failed";
import { tResponseOneModel } from "@/models/response";
import { tSuccessOneModel } from "@/models/success";
import { tVehicleModel } from "@/models/user/vehicle";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/user/vehicles/[uuid]">,
): Promise<NextResponse<tResponseOneModel<tVehicleModel>>> {
  try {
    const { uuid } = await context.params;

    const apiResponse = await fetch(
      `${process.env.API_URL}/user/vehicles/${uuid}`,
      {
        method: "GET",
        headers: {
          "API-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (apiResponse.ok === false) {
      const apiResponseBody: tFailedModel = await apiResponse.json();
      throw new ErrorModel(
        apiResponseBody.statusCode,
        apiResponseBody.message,
        apiResponseBody.issues,
      );
    }

    const apiResponseBody: tSuccessOneModel<tVehicleModel> =
      await apiResponse.json();

    return new NextResponse<tSuccessOneModel<tVehicleModel>>(
      JSON.stringify(apiResponseBody),
      {
        status: apiResponse.status,
      },
    );
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

    if (error instanceof ErrorModel)
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
