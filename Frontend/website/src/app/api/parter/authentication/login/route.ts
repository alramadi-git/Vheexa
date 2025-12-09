import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api";

import { tMemberAccountModel } from "@/models/partner/account";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import { clsFetch } from "@/consts/api/fetch";

import { eTime } from "@/enums/time";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsFailedModel } from "@/models/failed";

export async function POST(request: NextRequest) {
  return apiCatcher(async () => {
    const loginCredentials = await request.json();
    const parsedLoginCredentials: tLoginCredentials =
      zLoginCredentials.parse(loginCredentials);

    const data = await clsFetch.post(
      "/partner/authentication/login",
      parsedLoginCredentials,
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
    }: tSuccessOneModel<tMemberAccountModel> = await data.json();

    const response = new NextResponse<
      tSuccessOneModel<tMemberAccountModel["account"]>
    >(JSON.stringify({ data: account }), { status: data.status });

    response.cookies.set("partner-token", token, {
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
