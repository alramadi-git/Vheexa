import { NextResponse } from "next/server";
import { TCredentials, zCredentials } from "@/validations/credentials";

export async function POST(request: Request): Promise<NextResponse> {
  const body: TCredentials = await request.json();

  const zCredentialsResult = zCredentials.safeParse(body);
  if (zCredentialsResult.success === false) {
    const response = new NextResponse(
      JSON.stringify({
        message: "Invalid credentials",
        errors: zCredentialsResult.error.issues,
      }),
      {
        status: 400,
      },
    );

    return response;
  }

  const api = `${process.env.API}/user/authentication/signin`;
  const apiResponse = await fetch(api, {
    method: "POST",
    headers: {
      "Api-Key": `${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (apiResponse.ok === false) {
    const apiBody = await apiResponse.json();
    const response = new NextResponse(JSON.stringify(apiBody), {
      status: apiResponse.status,
    });

    return response;
  }

  const response = new NextResponse(null, {
    status: apiResponse.status,
    headers: apiResponse.headers,
  });

  return response;
}
