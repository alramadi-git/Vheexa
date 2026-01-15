import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { eDuration } from "@/enums/duration";

import { tAccountModel } from "@/models/partner/account";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tAccountModel["account"]>>> {
  return await apiCatch<tAccountModel["account"]>(async () => {
    const loginCredentials: unknown = await request.json();

    const parsedLoginCredentials: tLoginCredentials =
      zLoginCredentials.parse(loginCredentials);

    const backendResponse: Response = await clsFetch.post(
      "/partner/authentication/login",
      JSON.stringify(parsedLoginCredentials),
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const {
      data: { account, token },
    }: tSuccessOneModel<tAccountModel> = await backendResponse.json();

    const response = NextResponse.json<
      tSuccessOneModel<tAccountModel["account"]>
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
