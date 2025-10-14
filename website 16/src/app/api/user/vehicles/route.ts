import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const queryString = request.nextUrl.searchParams.toString();

  const api = `${process.env.API}/user/vehicles?${queryString === "" ? "" : `?${queryString}`}`;
  const apiResponse = await fetch(api, {
    method: "GET",
    headers: {
      "Api-Key": `${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const apiBody = await apiResponse.json();

  if (apiResponse.ok === false) {
    const response = new NextResponse(JSON.stringify(apiBody), {
      status: apiResponse.status,
    });

    return response;
  }

  const response = new NextResponse(JSON.stringify(apiBody), {
    status: apiResponse.status,
  });

  return response;
}
