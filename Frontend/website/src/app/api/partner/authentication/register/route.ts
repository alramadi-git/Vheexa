import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api";

import { tMemberAccountModel } from "@/models/partner/account";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/register-credentials";

import { clsFetch } from "@/consts/api/fetch";

import { eTime } from "@/enums/time";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsFailedModel } from "@/models/failed";

export async function POST(request: NextRequest) {
  return apiCatcher(async () => {
    const registerCredentials = await request.json();
    const parsedRegisterCredentials: tRegisterCredentials =
      zRegisterCredentials.parse(registerCredentials);

    const data = await clsFetch.post(
      "/partner/authentication/register",
      parsedRegisterCredentials,
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
      maxAge: parsedRegisterCredentials.rememberMe ? eTime.month : undefined,
    });

    return response;
  });
}
