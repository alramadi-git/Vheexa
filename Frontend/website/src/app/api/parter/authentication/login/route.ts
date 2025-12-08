import { NextRequest, NextResponse } from "next/server";

import { tMemberAccountModel } from "@/models/partner/account";

import { tLoginCredentials, zLoginCredentials } from "@/validations/login-credentials";

import { eTime } from "@/enums/time";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsErrorModel } from "@/models/failed";

import { apiCatcher } from "@/utilities/api";
import { ClsFetch } from "@/libraries/fetch";

export async function POST(request: NextRequest) {
  return apiCatcher(async () => {
    const loginCredentials = await request.json();
    const parsedLoginCredentials: tLoginCredentials = zLoginCredentials.parse(loginCredentials);

    const data = await new ClsFetch(
      process.env.API_URL!,
      "/partner/authentication",
      {
        "X-Api-Key": `${process.env.API_KEY}`,
      },
    ).post("/login", parsedLoginCredentials);
    
    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();

      throw new ClsErrorModel(
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
