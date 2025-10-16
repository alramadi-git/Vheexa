import { NextResponse } from "next/server";
import { tSuccessOneModel } from "@/app/api/user/_models/response";
import { tSigninModel } from "../../_models/signin";

export async function POST(request: Request): Promise<NextResponse> {
  const api = `${process.env.API}/user/authentication/signin`;
  const requestBody = await request.json();

  const apiResponse = await fetch(api, {
    method: "POST",
    headers: {
      "Api-Key": `${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const response = new NextResponse(null, {
    status: apiResponse.status,
  });

  const apiResponseBody: tSuccessOneModel<tSigninModel> = await apiResponse.json();
  
  const user = JSON.stringify(apiResponseBody.data.user);
  const token = apiResponseBody.data.token;

  response.cookies.set("user", user, {
    httpOnly: false,
    secure: true,
    path: "/",
    sameSite: "strict",
  });
  response.cookies.set("token", token, {
    httpOnly: false,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  return response;
}
