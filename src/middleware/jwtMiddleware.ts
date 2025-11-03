import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../utils/jwt";

export const runtime = "nodejs";

interface DecodedToken {
  id: number | string;
  [key: string]: unknown;
}

export async function jwtMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Authorization failed",
        data: { authorization: "Unauthorized" },
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = authHeader.split(" ")[1];
  const decoded = (await verifyToken(token)) as DecodedToken | null;

  if (!decoded || typeof decoded === "string") {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Authorization failed",
        data: { authorization: "Invalid token" },
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const userJson = JSON.stringify(decoded);

  // ✅ Set in both directions (some runtimes read only from request, some from response)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user", userJson);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add as response header too (for better propagation)
  response.headers.set("x-user", userJson);

  console.log("JWT decoded and attached.............................................", userJson);

  return response;
  // const requestHeaders = new Headers(req.headers);
  // console.log('user_decoded.....................................',decoded)
  // requestHeaders.set("x-user", JSON.stringify(decoded));
  // return NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });
}
