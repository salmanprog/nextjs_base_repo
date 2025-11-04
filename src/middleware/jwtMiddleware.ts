export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../utils/jwt";
import { getUserByToken } from "../utils/token";

export async function jwtMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { code: 401, message: "Authorization failed", data: { authorization: "Unauthorized" } },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const decoded = await verifyToken(token);
  if (!decoded || typeof decoded === "string") {
    return NextResponse.json(
      { code: 401, message: "Authorization failed", data: { authorization: "Invalid token" } },
      { status: 401 }
    );
  }

  const user = await getUserByToken(token);
  if (!user) {
    return NextResponse.json(
      { code: 401, message: "User not found", data: { authorization: "Invalid user" } },
      { status: 401 }
    );
  }
  const userJson = JSON.stringify(user);
  const res = NextResponse.next();
  res.headers.set("x-current-user", userJson);
  return res;
  // const userJson = JSON.stringify(user);
  // const requestHeaders = new Headers(req.headers);
  // requestHeaders.set("x-current-user", userJson);
  // const hasBody = !["GET", "HEAD"].includes(req.method.toUpperCase());
  // const forwardedRequest = new Request(req.url, {
  //   headers: requestHeaders,
  //   method: req.method,
  //   ...(hasBody ? { body: req.body, duplex: "half" as const } : {}),
  // });

  // const response = NextResponse.next({ request: forwardedRequest });
  // response.headers.set("x-middleware-override-headers", "x-current-user");
  // response.headers.set("x-current-user", userJson);
  // return response;
}
