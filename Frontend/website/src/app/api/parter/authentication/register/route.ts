import { NextRequest, NextResponse } from "next/server";

import { tMemberAccountModel } from "@/models/partner/account";

import { tSuccessOneModel } from "@/models/success";
import { tFailedModel, ClsErrorModel } from "@/models/failed";

import { zRegisterCredentials } from "@/validations/partner/register-credentials";

import { apiCatcher } from "@/utilities/api/api-helper";

export async function POST(request: NextRequest) {
  return apiCatcher(async () => {
    const registerCredentials = await request.json();
    const parsedRegisterCredentials =
      zRegisterCredentials.parse(registerCredentials);

    const data = await fetch(
      `${process.env.API_URL}/partner/authentication/register`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(parsedRegisterCredentials),
      },
    );

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
      maxAge: parsedRegisterCredentials.rememberMe ? eTime.month : undefined,
    });

    return response;
  });
}
