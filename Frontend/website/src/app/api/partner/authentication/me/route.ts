import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import { tUndefinable } from "@/types/nullish";

import { tJwt, zJwt } from "@/validations/jwt";

import { tPartnerAccountModel } from "@/models/partner/account";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tPartnerAccountModel["account"]>>> {
  return await apiCatch<tPartnerAccountModel["account"]>(async () => {
    const token: tUndefinable<string> =
      request.cookies.get("partner-token")?.value;
    const parsedToken: tJwt = zJwt.parse(token);

    const backendResponse: Response = await clsFetch.get(
      "/partner/authentication/me",
      {
        Authorization: `Bearer ${parsedToken}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const { data: account }: tSuccessOneModel<tPartnerAccountModel["account"]> =
      await backendResponse.json();

    return NextResponse.json<tSuccessOneModel<tPartnerAccountModel["account"]>>(
      { data: account },
      {
        status: backendResponse.status,
      },
    );
  });
}
