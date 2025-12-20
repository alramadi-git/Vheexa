import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import { eDuration } from "@/enums/duration";

import { tPartnerAccountModel } from "@/models/partner/account";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tPartnerAccountModel["account"]>>> {
  return await apiCatch<tPartnerAccountModel["account"]>(async () => {
    const registerCredentials: unknown = await request.json();

    const parsedRegisterCredentials: tRegisterCredentials =
      zRegisterCredentials.parse(registerCredentials);

    const backendResponse: Response = await clsFetch.post(
      "/partner/authentication/register",
      parsedRegisterCredentials,
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new Error(errorText);
    }

    const {
      data: { account, token },
    }: tSuccessOneModel<tPartnerAccountModel> = await backendResponse.json();

    const response = NextResponse.json<
      tSuccessOneModel<tPartnerAccountModel["account"]>
    >({ data: account }, { status: backendResponse.status });

    response.cookies.set("partner-token", token, {
      secure: true,
      httpOnly: true,
      priority: "high",
      sameSite: "strict",
      path: "/partner",
      maxAge: parsedRegisterCredentials.rememberMe
        ? eDuration.month
        : undefined,
    });
    return response;
  });
}
