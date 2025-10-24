import { NextResponse } from "next/server";

import { tSuccessOneModel } from "@/models/success";
import { tAccountModel } from "@/models/account";
import { tFailedModel, ErrorModel } from "@/models/failed";
import { tUserModel } from "@/models/user/user";

import { ZodError } from "zod/v4";
import { zLoginCredentials } from "@/validations/authentication";
import { tResponseOneModel } from "@/models/response";

export async function POST(
  request: Request,
): Promise<NextResponse<tResponseOneModel<tUserModel>>> {
  try {
    console.log("request");
    const loginCredentialsBody = await request.json();
    console.log("body: ", loginCredentialsBody);
    const loginCredentials = zLoginCredentials.parse(loginCredentialsBody);
    console.log("body after parsing: ", loginCredentialsBody);

    const apiResponse = await fetch(
      `${process.env.API_URL}/user/authentication/login`,
      {
        method: "POST",
        headers: {
          "API-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
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

    const apiResponseBody: tSuccessOneModel<tAccountModel<tUserModel>> =
      await apiResponse.json();

    const account = apiResponseBody.data.account;
    const token = apiResponseBody.data.token;

    const response = new NextResponse<tSuccessOneModel<tUserModel>>(
      JSON.stringify({ data: account }),
      { status: apiResponse.status },
    );

    response.cookies.set("account", JSON.stringify(account), {
      httpOnly: false,
      secure: true,
      path: "/",
      sameSite: "strict",
    });
    response.cookies.set("token", token, {
      httpOnly: false,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    return response;
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
        },
        { status: 400 },
      );

    if (error instanceof ErrorModel)
      return NextResponse.json(
        {
          statusCode: error.statusCode,
          message: error.message,
          issues: error.issues,
        },
        { status: error.statusCode },
      );

    if (error instanceof Error)
      return NextResponse.json(
        {
          statusCode: 500,
          message: error.message,
          issues: [],
        },
        { status: 500 },
      );

    return NextResponse.json(
      {
        statusCode: 500,
        message: "Unknown error",
        issues: [],
      },
      { status: 500 },
    );
  }
}
