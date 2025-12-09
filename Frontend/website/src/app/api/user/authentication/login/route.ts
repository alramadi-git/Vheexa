import { NextResponse } from "next/server";

import { tAccountModel } from "@/models/account";
import { tUserModel } from "@/models/user/user";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsFailedModel } from "@/models/failed";

import { tResponseOneModel } from "@/models/response";

import { apiCatcher } from "@/utilities/api";

export async function POST(
  request: Request,
): Promise<NextResponse<tResponseOneModel<tUserModel>>> {
  return apiCatcher(async () => {
    const loginCredentials: tLoginCredentials = await request.json();
    const parsedLoginCredentials: tLoginCredentials =
      zLoginCredentials.parse(loginCredentials);

    const data = await fetch(
      `${process.env.API_URL}/user/authentication/login`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(parsedLoginCredentials),
      },
    );

    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();

      throw new ClsFailedModel(
        dataBody.statusCode,
        dataBody.message,
        dataBody.issues,
      );
    }

    const {
      data: { account, token },
    }: tSuccessOneModel<tAccountModel<tUserModel>> = await data.json();

    const response = new NextResponse<tSuccessOneModel<tUserModel>>(
      JSON.stringify({ data: account }),
      { status: data.status },
    );

    response.cookies.set("user-token", token, {
      httpOnly: true,
      secure: true,
      priority: "high",
      sameSite: "strict",
      path: "/partner/dashboard",
      maxAge: parsedLoginCredentials.rememberMe ? eTime.month : undefined,
    });

    return response;
  });
}
