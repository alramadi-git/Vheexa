import { NextRequest, NextResponse } from "next/server";

import { apiCatcher } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import { tToken, zToken } from "@/validations/token";

import { tPartnerAccountModel } from "@/models/partner/account";
import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tPartnerAccountModel["account"]>>> {
  return await apiCatcher<tPartnerAccountModel["account"]>(async () => {
    const token: unknown = request.cookies.get("partner-token")?.value;
    const parsedToken: tToken = zToken.parse(token);

    const backendResponse: Response = await clsFetch.get(
      "/partner/authentication/me",
      { Authorization: `Bearer ${parsedToken}` },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new Error(errorText);
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
