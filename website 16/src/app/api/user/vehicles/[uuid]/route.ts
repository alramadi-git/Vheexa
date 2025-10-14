import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/user/vehicles/[uuid]">,
): Promise<NextResponse> {
  const { uuid } = await context.params;

  const api = `${process.env.API}/user/vehicles/${uuid}`;
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
