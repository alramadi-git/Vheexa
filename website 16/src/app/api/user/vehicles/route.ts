import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log("api: start")
  let queryString = request.nextUrl.searchParams.toString();
  queryString = queryString === "" ? "" : `?${queryString}`;

  const api = `${process.env.API}/user/vehicles${queryString}`;
  const apiResponse = await fetch(api, {
    method: "GET",
    headers: {
      "Api-Key": `${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  console.log(apiResponse)

  const apiBody = await apiResponse.json();
  const response = new NextResponse(JSON.stringify(apiBody), {
    status: apiResponse.status,
  });

  if (apiResponse.ok === false) return response;
  return response;
}
