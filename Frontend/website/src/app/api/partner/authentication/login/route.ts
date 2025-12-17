import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import { eDuration } from "@/enums/duration";

import { tPartnerAccountModel } from "@/models/partner/account";
import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tPartnerAccountModel["account"]>>> {
  return await apiCatcher<tPartnerAccountModel["account"]>(async () => {
    const loginCredentials: unknown = await request.json();

    const parsedLoginCredentials: tLoginCredentials =
      zLoginCredentials.parse(loginCredentials);

    const backendResponse: Response = await clsFetch.post(
      "/partner/authentication/login",
      parsedLoginCredentials,
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
      maxAge: parsedLoginCredentials.rememberMe ? eDuration.month : undefined,
    });
    return response;
  });
}
