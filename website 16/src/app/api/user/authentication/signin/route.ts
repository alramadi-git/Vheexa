import { NextResponse } from "next/server";

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
  console.log(apiResponse);

  if (apiResponse.ok === false) {
    const apiBody = null //await apiResponse.json();
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
