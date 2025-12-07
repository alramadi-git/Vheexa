import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api/api-helper";
import { zLoginCredentials } from "@/validations/password";
import { ClsErrorModel, tFailedModel } from "@/models/failed";
import { tSuccessOneModel } from "@/models/success";
import { tMemberAccountModel } from "@/models/partner/account";

export async function POST(request: NextRequest) {
  return apiCatcher(async () => {
    const loginCredentialsBody = await request.json();
    const loginCredentials = zLoginCredentials.parse(loginCredentialsBody);

    const apiResponse = await fetch(
      `${process.env.API_URL}/partner/authentication/login`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      },
    );

    if (apiResponse.ok === false) {
      const apiResponseBody: tFailedModel = await apiResponse.json();

      throw new ClsErrorModel(
        apiResponseBody.statusCode,
        apiResponseBody.message,
        apiResponseBody.issues,
      );
    }

    const apiResponseBody: tSuccessOneModel<tMemberAccountModel> =
      await apiResponse.json();

    const { account, token } = apiResponseBody.data;

    const response = new NextResponse<
      tSuccessOneModel<tMemberAccountModel["account"]>
    >(JSON.stringify({ data: account }), { status: apiResponse.status });

    response.cookies.set("partner-token", token, {
      httpOnly: true,
      secure: true,
      priority: "high",
      sameSite: "strict",
      path: "/partner/",
      maxAge: eTime.month,
    });

    return response;
  });
}
