import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { clsFetch } from "@/consts/api/fetch";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import { eDuration } from "@/enums/duration";

import { tAccountModel } from "@/models/partner/account";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneModel } from "@/models/response";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<tAccountModel["account"]>>> {
  return await apiCatch<tAccountModel["account"]>(async () => {
    const formData: FormData = await request.formData();
    const credentials: tRegisterCredentials = {
      partner: {
        logo: formData.get("partner.logo") as File,
        banner: formData.get("partner.banner") as File,
        handle: formData.get("partner.handle") as string,
        name: formData.get("partner.name") as string,
        phoneNumber: formData.get("partner.phoneNumber") as string,
        email: formData.get("partner.email") as string,
        password: formData.get("partner.password") as string,
      },
      branch: {
        location: {
          country: formData.get("branch.location.country") as string,
          city: formData.get("branch.location.city") as string,
          street: formData.get("branch.location.street") as string,
          latitude: Number(formData.get("branch.location.latitude") as string),
          longitude: Number(
            formData.get("branch.location.longitude") as string,
          ),
        },
        name: formData.get("branch.name") as string,
        phoneNumber: formData.get("branch.phoneNumber") as string,
        email: formData.get("branch.email") as string,
      },
      member: {
        avatar: formData.get("member.avatar") as File,
        username: formData.get("member.username") as string,
        email: formData.get("member.email") as string,
        password: formData.get("member.password") as string,
      },
      rememberMe: (formData.get("rememberMe") as string) === "true",
    };

    zRegisterCredentials.parse(credentials);

    const backendResponse: Response = await clsFetch.post(
      "/partner/authentication/register",
      formData,
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
      maxAge: formData.get("rememberMe") ? eDuration.month : undefined,
    });
    return response;
  });
}
