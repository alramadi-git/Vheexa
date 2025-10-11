import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: any,
): Promise<NextResponse> {
  console.log(context);

  return NextResponse.json({});
  
  const api = `${process.env.API}/user/vehicles/{request.params.uuid}`;
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
